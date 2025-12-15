from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import requests
import os
import json

# ---------------- CONFIG ----------------
app = Flask(__name__)
CORS(app)

SHEET_URL = "https://docs.google.com/spreadsheets/d/10bCUnhQCopT-mYTUYwtE-9WDlocOOtymX8WLgth6hAM/export?format=csv"
IMAGE_API_URL = "https://pravinpatil007-eye-disease-detection-api-new.hf.space/api/predict_simple"
API_KEY = os.getenv("EYE_API_KEY", "MY_SECRET_API_KEY")

# ---------------- MODEL TRAINING ----------------
def train_question_model():
    df = pd.read_csv(SHEET_URL)
    df = df.fillna("Unknown")

    label_col = None
    for col in df.columns:
        if col.strip().lower() in ["disease", "eye disease", "diagnosis", "label", "detected disease"]:
            label_col = col
            break

    if not label_col:
        raise ValueError(f"Dataset must contain a label column (found: {list(df.columns)})")

    print(f"✅ Using label column: {label_col}")

    X = df.drop(label_col, axis=1)
    y = LabelEncoder().fit_transform(df[label_col])
    X = pd.get_dummies(X)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = RandomForestClassifier(n_estimators=300, random_state=42)
    model.fit(X_train, y_train)

    label_encoder = LabelEncoder().fit(df[label_col])
    return model, X.columns, label_encoder


print("📘 Training question-based model from Google Sheet...")
question_model, question_features, label_encoder = train_question_model()
print("✅ Model training complete!")

# ---------------- IMAGE MODEL ----------------
def get_image_prediction(image_file):
    files = {"image": (image_file.filename, image_file.stream, image_file.mimetype)}
    try:
        response = requests.post(IMAGE_API_URL, files=files)
        if response.status_code == 200:
            return response.json()
        else:
            return {"disease": "Unknown", "confidence": 0.0}
    except Exception:
        return {"disease": "Unknown", "confidence": 0.0}

# ---------------- COMBINE PREDICTIONS ----------------
def combine_predictions(question_probs, image_pred):
    image_disease = image_pred.get("disease", "Unknown")
    image_conf = float(image_pred.get("confidence", 0.0))

    # Extract question prediction
    max_idx = question_probs.argmax()
    question_conf = float(question_probs[max_idx])
    question_disease = label_encoder.inverse_transform([max_idx])[0]

    # Updated weights
    image_weight = 0.4
    question_weight = 0.6

    combined_conf = (image_weight * image_conf) + (question_weight * question_conf)

    # ---- Smarter Logic ----
    if image_disease.lower() == question_disease.lower():
        final_disease = image_disease  # both agree
    else:
        # Check if image model might be wrong (low conf)
        if image_conf < 0.55 and question_conf > 0.4:
            final_disease = question_disease
        elif question_conf < 0.3:
            final_disease = image_disease
        else:
            # fallback to higher confidence
            final_disease = (
                question_disease if question_conf >= image_conf else image_disease
            )

    # Confidence level
    if combined_conf >= 0.75:
        conf_label = "High"
    elif combined_conf >= 0.5:
        conf_label = "Medium"
    else:
        conf_label = "Low"

    return {
        "image_disease": image_disease,
        "image_confidence": round(image_conf, 3),
        "question_disease": question_disease,
        "question_confidence": round(question_conf, 3),
        "final_disease": final_disease,
        "final_confidence": round(combined_conf, 3),
        "confidence_level": conf_label
    }

# ---------------- AUTH ----------------
def require_api_key(req):
    key = req.headers.get("x-api-key")
    return key == API_KEY

# ---------------- ROUTES ----------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Hybrid Eye Disease Detection API is running successfully 🚀",
        "usage": {
            "GET": "/predict?Age=45&Diabetes=Yes&Blurred_Vision=Yes",
            "POST": "/predict (multipart/form-data: answers JSON + image file)",
            "headers": {"x-api-key": "YOUR_API_KEY_HERE"}
        }
    })

@app.route("/predict", methods=["GET", "POST"])
def predict():
    if not require_api_key(request):
        return jsonify({"error": "Unauthorized: Invalid API key"}), 401

    try:
        # ----- GET (questions only)
        if request.method == "GET":
            user_answers = dict(request.args)
            if not user_answers:
                return jsonify({"error": "Provide question answers as query params"}), 400

            user_df = pd.DataFrame([user_answers])
            user_df = pd.get_dummies(user_df).reindex(columns=question_features, fill_value=0)

            question_probs = question_model.predict_proba(user_df)[0]

            max_idx = question_probs.argmax()
            disease = label_encoder.inverse_transform([max_idx])[0]
            conf = round(float(question_probs[max_idx]), 3)

            return jsonify({
                "mode": "GET",
                "predicted_disease": disease,
                "confidence": conf,
                "note": "Prediction based only on questionnaire answers."
            })

        # ----- POST (image + questions)
        if request.method == "POST":
            user_answers = request.form.get("answers")
            image_file = request.files.get("image")

            if user_answers is None or image_file is None:
                return jsonify({"error": "Both 'answers' JSON and 'image' file required"}), 400

            answers_dict = json.loads(user_answers)
            user_df = pd.DataFrame([answers_dict])
            user_df = pd.get_dummies(user_df).reindex(columns=question_features, fill_value=0)

            question_probs = question_model.predict_proba(user_df)[0]
            image_pred = get_image_prediction(image_file)

            result = combine_predictions(question_probs, image_pred)
            result["mode"] = "POST"
            return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 7860)), debug=False)
