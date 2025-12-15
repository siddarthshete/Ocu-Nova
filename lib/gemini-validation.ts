// lib/gemini-validation.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface GeminiValidationResult {
  isRetinal: boolean;
  confidence: number;
  reason: string;
  suggestions?: string;
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function validateRetinalImageWithGemini(base64Image: string, mimeType: string = 'image/jpeg'): Promise<GeminiValidationResult> {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro-vision",
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 500,
      }
    });

    const prompt = `
    Analyze this medical image and determine if it is a retinal fundus image (retina scan). 
    
    CHARACTERISTICS OF RETINAL FUNDUS IMAGES:
    - Circular or oval shape with dark background
    - Visible optic disc (bright circular area)
    - Blood vessels radiating from the optic disc
    - Macula area (darker spot near center)
    - Red, orange, or yellowish hue typical of retinal photography
    - Clear anatomical structures of the retina
    
    CHARACTERISTICS OF NON-RETINAL IMAGES:
    - External eye photos (showing eyelids, lashes, white of eye)
    - Blurry or unclear images
    - Images with faces or other body parts
    - Non-medical images
    - Other medical scans (MRI, CT, etc.)
    
    Respond with ONLY JSON in this exact format:
    {
      "isRetinal": true/false,
      "confidence": number between 0-1,
      "reason": "brief explanation of why it is or isn't a retinal image",
      "suggestions": "if not retinal, provide guidance on what a proper retinal image should look like"
    }
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: mimeType,
          data: base64Image
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedResult = JSON.parse(jsonMatch[0]);
      return {
        isRetinal: Boolean(parsedResult.isRetinal),
        confidence: Math.min(Math.max(Number(parsedResult.confidence) || 0.5, 0), 1),
        reason: String(parsedResult.reason || 'Analyzed by AI'),
        suggestions: parsedResult.suggestions
      };
    } else {
      // Fallback if JSON parsing fails
      const lowerText = text.toLowerCase();
      const isRetinal = lowerText.includes('retinal') || lowerText.includes('fundus') || 
                       (lowerText.includes('yes') && lowerText.includes('retina'));
      
      return {
        isRetinal,
        confidence: isRetinal ? 0.7 : 0.3,
        reason: "Automated analysis: " + text.substring(0, 200),
        suggestions: isRetinal ? undefined : 'Please upload a clear retinal fundus image showing the inner eye structures.'
      };
    }
  } catch (error: any) {
    console.error('Gemini API error:', error);
    
    if (error?.status === 401) {
      throw new Error('Google API key is invalid');
    } else if (error?.status === 429) {
      throw new Error('API rate limit exceeded. Please try again later.');
    } else {
      throw new Error(`Image validation failed: ${error.message}`);
    }
  }
}