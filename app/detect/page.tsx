"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
  Shield,
  Brain,
  Stethoscope,
} from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

interface PredictionResult {
  disease: string;
  confidence: number;
  models_used?: string[];
}

interface SymptomAnswers {
  blurryVision: boolean;
  eyePain: boolean;
  halosAroundLights: boolean;
  floaters: boolean;
  lossOfSideVision: boolean;
  historyOfDiabetes: boolean;
}

interface FinalDiagnosis {
  primaryDisease: string;
  possibleConditions: string[];
  confidence: number;
  symptomsMatch: boolean;
  apiPrediction: string;
  symptomBasedPrediction: string[];
}

interface ValidationResult {
  isRetinal: boolean;
  confidence: number;
  reason: string;
  suggestions?: string;
  modelUsed?: string;
}

export default function DetectPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [finalDiagnosis, setFinalDiagnosis] = useState<FinalDiagnosis | null>(null);

  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const [symptoms, setSymptoms] = useState<SymptomAnswers>({
    blurryVision: false,
    eyePain: false,
    halosAroundLights: false,
    floaters: false,
    lossOfSideVision: false,
    historyOfDiabetes: false,
  });

  // ✅ Downscale large images before validation
  async function downscaleImage(file: File, maxSize = 512): Promise<File> {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    await new Promise((r) => (img.onload = r));

    const canvas = document.createElement("canvas");
    const scale = Math.min(maxSize / img.width, maxSize / img.height);
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob>((r) =>
      canvas.toBlob((b) => r(b!), file.type, 0.8)
    );

    return new File([blob], file.name, { type: file.type });
  }

  // ✅ Redirect unauthenticated users
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-muted-foreground mt-2">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-muted-foreground mt-2">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // ✅ Handle image selection + downscaling
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG, PNG)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image too large. Please select an image smaller than 5MB.");
      return;
    }

    // ✅ Downscale before sending to API (prevents token overflow)
    const resizedFile = await downscaleImage(file, 512);

    setSelectedFile(resizedFile);
    setPreviewUrl(URL.createObjectURL(resizedFile));
    setError(null);
    setValidationResult(null);
    setResult(null);
    setFinalDiagnosis(null);
    setShowQuestionnaire(false);

    await validateImage(resizedFile);
  };

  // ✅ Validate with OpenAI Vision API
  const validateImage = async (file: File) => {
    setValidating(true);
    setError(null);

    try {
      console.log("🔍 Validating image with OpenAI GPT-4o-mini Vision API...");
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/validate-retina", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Validation failed");

      setValidationResult(data);

      if (!data.isRetinal) {
        setError(`❌ This image may not be a retinal image. ${data.reason}`);
      }
    } catch (err: any) {
      console.error("OpenAI validation error:", err);
      setError(`Validation failed: ${err.message}`);
    } finally {
      setValidating(false);
    }
  };

  // ✅ Send to Disease Prediction API
  const handleSubmit = async () => {
    if (!selectedFile) return setError("Please select an image first");
    if (validationResult && !validationResult.isRetinal)
      return setError("Please upload a valid retinal image for analysis.");

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const res = await fetch(
        "https://pravinpatil007-eye-disease-detection-api-new.hf.space/api/predict_simple",
        { method: "POST", body: formData }
      );

      if (!res.ok) throw new Error("Failed to get prediction from API");

      const data = await res.json();
      setResult(data);
      setShowQuestionnaire(true);
    } catch (err: any) {
      console.error("Prediction error:", err);
      setError("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setFinalDiagnosis(null);
    setValidationResult(null);
    setShowQuestionnaire(false);
    setError(null);
    setSymptoms({
      blurryVision: false,
      eyePain: false,
      halosAroundLights: false,
      floaters: false,
      lossOfSideVision: false,
      historyOfDiabetes: false,
    });
  };

  const handleSymptomChange = (symptom: keyof SymptomAnswers) => {
    setSymptoms((prev) => ({ ...prev, [symptom]: !prev[symptom] }));
  };

  const predictFromSymptoms = (symptoms: SymptomAnswers): string[] => {
    const conditions: string[] = [];
    
    const hasCataractSymptoms = symptoms.blurryVision && symptoms.halosAroundLights && !symptoms.eyePain;
    const hasGlaucomaSymptoms = symptoms.eyePain && symptoms.lossOfSideVision && !symptoms.historyOfDiabetes;
    const hasDiabeticRetinopathySymptoms = symptoms.blurryVision && symptoms.floaters && symptoms.historyOfDiabetes;
    const hasNormalSymptoms = !symptoms.blurryVision && !symptoms.eyePain && !symptoms.halosAroundLights && 
                              !symptoms.floaters && !symptoms.lossOfSideVision && !symptoms.historyOfDiabetes;
    
    if (hasCataractSymptoms) conditions.push("Cataract");
    if (hasGlaucomaSymptoms) conditions.push("Glaucoma");
    if (hasDiabeticRetinopathySymptoms) conditions.push("Diabetic Retinopathy");
    if (hasNormalSymptoms) conditions.push("Normal");
    
    if (conditions.length === 0 && (
      symptoms.blurryVision || symptoms.eyePain || symptoms.halosAroundLights || 
      symptoms.floaters || symptoms.lossOfSideVision || symptoms.historyOfDiabetes
    )) {
      conditions.push("Unable to determine from symptoms");
    }
    
    if (conditions.length === 0) {
      conditions.push("Normal");
    }
    
    return conditions;
  };

  const handleDiagnosis = () => {
    if (!result) return;

    const symptomBasedConditions = predictFromSymptoms(symptoms);
    const apiDisease = result.disease;
    
    const symptomsMatch = symptomBasedConditions.some(condition => 
      condition.toLowerCase().includes(apiDisease.toLowerCase()) ||
      apiDisease.toLowerCase().includes(condition.toLowerCase())
    );
    
    const allPossibleConditions = Array.from(
      new Set([apiDisease, ...symptomBasedConditions])
    ).filter(condition => condition !== "Unable to determine from symptoms");
    
    const primaryDisease = symptomsMatch ? apiDisease : allPossibleConditions[0];
    
    const final: FinalDiagnosis = {
      primaryDisease,
      possibleConditions: allPossibleConditions,
      confidence: Math.round(result.confidence * 100),
      symptomsMatch,
      apiPrediction: apiDisease,
      symptomBasedPrediction: symptomBasedConditions,
    };

    setFinalDiagnosis(final);
    
    // Save to database
    if (user && previewUrl) {
      supabase.from("detection_history").insert({
        user_id: user.id,
        image_url: previewUrl,
        detected_condition: final.primaryDisease,
        possible_conditions: final.possibleConditions,
        symptoms_used: symptoms,
        models_used: result.models_used || [],
        confidence: result.confidence,
        symptoms_match: final.symptomsMatch
      }).then(({ error }: { error: any }) => {
        if (error) {
          console.error("Failed to save detection history:", error);
        }
      });
    }
  };

  const canAnalyze = validationResult?.isRetinal && !validating;

  const getDiseaseColor = (disease: string) => {
    const diseaseLower = disease.toLowerCase();
    if (diseaseLower.includes("normal")) return "text-green-500";
    if (diseaseLower.includes("glaucoma")) return "text-red-500";
    if (diseaseLower.includes("cataract")) return "text-blue-500";
    if (diseaseLower.includes("diabetic") || diseaseLower.includes("retinopathy")) return "text-orange-500";
    return "text-primary";
  };

  const getSeverityColor = (disease: string) => {
    const diseaseLower = disease.toLowerCase();
    if (diseaseLower.includes("normal")) return "bg-green-100 text-green-800 border-green-200";
    if (diseaseLower.includes("glaucoma")) return "bg-red-100 text-red-800 border-red-200";
    if (diseaseLower.includes("cataract")) return "bg-blue-100 text-blue-800 border-blue-200";
    if (diseaseLower.includes("diabetic") || diseaseLower.includes("retinopathy")) return "bg-orange-100 text-orange-800 border-orange-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-primary/10">
                <Eye className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">OcuNova</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload a retinal fundus image and get AI-powered disease analysis.
            </p>
            <p className="text-sm text-green-600">✅ Welcome, {user?.email}</p>
          </div>

          {/* Upload Section */}
          {!finalDiagnosis && !showQuestionnaire && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Upload Retinal Image</CardTitle>
                <CardDescription>
                  Select a clear retinal fundus image (JPG or PNG format)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8">
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center cursor-pointer text-center space-y-4"
                  >
                    <Upload className="h-12 w-12 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                      <p className="text-xs text-blue-600 mt-2">✓ AI-powered retinal image verification</p>
                    </div>
                  </label>
                </div>

                {/* Validation Status */}
                {validating && (
                  <Alert className="bg-blue-50 border-blue-200">
                    <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                    <AlertDescription className="flex items-center gap-2">
                      <Brain className="h-4 w-4" /> Analyzing image with OpenAI Vision...
                    </AlertDescription>
                  </Alert>
                )}

                {validationResult && (
                  <Alert variant={validationResult.isRetinal ? "default" : "destructive"}>
                    {validationResult.isRetinal ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertDescription>
                      <strong>
                        {validationResult.isRetinal ? "✅ Valid Retinal Image" : "❌ Not a Retinal Image"}
                      </strong>
                      <br />
                      {validationResult.reason}
                      {validationResult.suggestions && (
                        <>
                          <br />
                          <span className="text-sm opacity-90">{validationResult.suggestions}</span>
                        </>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {previewUrl && (
                  <div className="space-y-4">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
                      <Image src={previewUrl} alt="Preview" fill className="object-contain" />
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={handleSubmit} disabled={loading || !canAnalyze} className="flex-1">
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                          </>
                        ) : (
                          <>
                            <Shield className="mr-2 h-4 w-4" /> 
                            {canAnalyze ? 'Analyze Retinal Image' : 'Upload Retinal Image First'}
                          </>
                        )}
                      </Button>
                      <Button variant="outline" onClick={handleReset}>
                        <RefreshCw className="mr-2 h-4 w-4" /> Reset
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Symptom Questionnaire */}
          {showQuestionnaire && result && (
            <Card className="border-2 border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Stethoscope className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Patient Symptoms Questionnaire</CardTitle>
                    <CardDescription>
                      Please answer these questions to help improve diagnosis accuracy
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* API Result Preview */}
                {result && (
                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Initial AI Analysis:</strong> {result.disease} ({(result.confidence * 100).toFixed(1)}% confidence)
                    </AlertDescription>
                  </Alert>
                )}

                {/* Symptoms Questions */}
                <div className="grid gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Please indicate if you experience any of these symptoms:</h3>
                    
                    <div className="grid gap-4">
                      {[
                        { key: 'blurryVision', label: 'Blurry Vision' },
                        { key: 'eyePain', label: 'Eye Pain' },
                        { key: 'halosAroundLights', label: 'Halos Around Lights' },
                        { key: 'floaters', label: 'Floaters' },
                        { key: 'lossOfSideVision', label: 'Loss of Side Vision' },
                        { key: 'historyOfDiabetes', label: 'History of Diabetes' },
                      ].map(({ key, label }) => (
                        <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                          <span className="font-medium">{label}</span>
                          <div className="flex gap-2">
                            <Button
                              variant={symptoms[key as keyof SymptomAnswers] ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleSymptomChange(key as keyof SymptomAnswers)}
                            >
                              {symptoms[key as keyof SymptomAnswers] ? "Yes" : "No"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button onClick={handleDiagnosis} className="w-full">
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Get Final Diagnosis
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Final Diagnosis */}
          {finalDiagnosis && previewUrl && (
            <div className="space-y-6">
              {/* Image Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Analyzed Retinal Image</CardTitle>
                  {validationResult && (
                    <CardDescription className="text-green-600">
                      ✓ Verified as valid retinal image
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
                    <Image src={previewUrl} alt="Analyzed" fill className="object-contain" />
                  </div>
                </CardContent>
              </Card>

              {/* Final Diagnosis Card */}
              <Card className="border-2 border-primary/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                    <div>
                      <CardTitle>Comprehensive Analysis Complete</CardTitle>
                      <CardDescription>
                        Combined AI and symptom-based diagnosis from verified retinal image
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Primary Diagnosis */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Primary Diagnosis</p>
                    <p className={`text-3xl font-bold ${getDiseaseColor(finalDiagnosis.primaryDisease)}`}>
                      {finalDiagnosis.primaryDisease}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Confidence: {finalDiagnosis.confidence}%
                    </p>
                  </div>

                  {/* All Possible Conditions */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {finalDiagnosis.possibleConditions.length > 1 ? "All Possible Conditions" : "Condition"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {finalDiagnosis.possibleConditions.map((condition, index) => (
                        <span 
                          key={index} 
                          className={`px-3 py-2 rounded-full text-sm font-medium border ${getSeverityColor(condition)} ${
                            condition === finalDiagnosis.primaryDisease ? 'ring-2 ring-primary ring-offset-2' : ''
                          }`}
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Symptoms Match Indicator */}
                  <Alert variant={finalDiagnosis.symptomsMatch ? "default" : "destructive"}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {finalDiagnosis.symptomsMatch 
                        ? "✓ Symptoms align with AI prediction"
                        : "⚠ Symptoms suggest different conditions than AI prediction. Please consult a specialist for accurate diagnosis."}
                    </AlertDescription>
                  </Alert>

                  {/* Analysis Breakdown */}
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">AI Image Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-medium">{finalDiagnosis.apiPrediction}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Based on visual analysis of the retinal image
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Symptom-Based Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1">
                          {finalDiagnosis.symptomBasedPrediction.map((condition, index) => (
                            <p key={index} className="font-medium">
                              {condition}
                            </p>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Based on reported symptoms pattern
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleReset} className="flex-1">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Try Another Image
                    </Button>
                    <Button variant="outline" asChild className="flex-1">
                      <a href="/eye-information">Learn More</a>
                    </Button>
                  </div>

                  {/* Medical Disclaimer */}
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      This is an AI-powered screening tool and should not replace professional medical diagnosis. 
                      Please consult with an eye care professional for accurate diagnosis and treatment.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}