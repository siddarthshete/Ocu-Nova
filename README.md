```markdown
# Eye Disease Detection using AI/ML with Integrated AR

## 📌 Overview
Eye diseases such as cataract, glaucoma, and diabetic retinopathy require early detection to prevent permanent vision loss. This project presents an intelligent system that automatically classifies eye diseases from retinal images using advanced deep learning techniques. Augmented Reality (AR) is integrated to provide visual and educational insights about detected conditions.

---

## 🎯 Objectives
- Automatically classify eye diseases from retinal images
- Improve detection accuracy using ensemble deep learning models
- Provide AR-based visualization for better understanding
- Support early diagnosis through intelligent automation

---

## 🧠 Technologies Used
- **Programming Language:** Python  
- **Frameworks:** TensorFlow, Keras  
- **Models:** CNN, ResNet50, DenseNet121, InceptionV3  
- **Ensemble Method:** Stacking / Weighted Ensemble  
- **Libraries:** NumPy, Pandas, OpenCV, Matplotlib  
- **AR Tools:** Unity / AR SDK  

---

## 🏗️ System Architecture
1. Image acquisition  
2. Image preprocessing and augmentation  
3. Feature extraction using multiple CNN architectures  
4. Ensemble-based classification  
5. Disease prediction output  
6. AR visualization and awareness module  

---

## 📊 Model Performance
| Model | Accuracy |
|------|----------|
| CNN | 47.33% |
| ResNet50 | 25.52% |
| DenseNet121 | 86.80% |
| InceptionV3 | 63.65% |
| Weighted Ensemble | 82.49% |
| **Final Stacking Ensemble** | **96.14%** |

---

## 📂 Project Structure
```

├── dataset/
├── preprocessing/
├── models/
├── ensemble/
├── ar_module/
├── results/
├── requirements.txt
└── main.py

````

---

## ▶️ How to Run
1. Clone the repository  
   ```bash
   git clone <repository-url>
````

2. Install dependencies

   ```bash
   pip install -r requirements.txt
   ```
3. Run the application

   ```bash
   python main.py
   ```

---

## 🔮 Future Enhancements

* Mobile application integration
* Real-time disease detection
* Explainable AI for medical transparency
* Cloud-based deployment

---

## 📜 License

This project is intended for educational and research purposes.

---

