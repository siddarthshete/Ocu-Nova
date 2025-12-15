// lib/image-validation.ts

export interface ValidationResult {
  isRetinal: boolean;
  confidence: number;
  reason: string;
}

/**
 * validateRetinalImageClient(file)
 * --------------------------------
 * Sends an uploaded image file to your OpenAI-powered /api/validate-retina route.
 * Returns structured validation output: { isRetinal, confidence, reason }.
 */
export async function validateRetinalImageClient(
  file: File
): Promise<ValidationResult> {
  const formData = new FormData();
  formData.append("image", file);

  try {
    console.log("📤 Sending image to /api/validate-retina ...");

    const response = await fetch("/api/validate-retina", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("❌ Server responded with error:", text);
      throw new Error(`Validation failed: ${response.statusText}`);
    }

    const result = (await response.json()) as ValidationResult;
    console.log("✅ Validation result:", result);

    return result;
  } catch (error: any) {
    console.error("⚠️ Validation error:", error);
    return {
      isRetinal: false,
      confidence: 0,
      reason: "Validation service unavailable or error occurred",
    };
  }
}
