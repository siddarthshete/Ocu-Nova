"use client";

import { NextResponse } from 'next/server'

// System prompt for the AI
const systemPrompt = `You are OcuNova AI Assistant, a helpful and knowledgeable AI for an eye disease detection platform. 

CRITICAL GUIDELINES:
- This is an EDUCATIONAL TOOL only, NOT for medical diagnosis
- Always emphasize that users should consult healthcare professionals
- Be accurate and informative about eye health
- Maintain a professional but friendly tone
- If unsure about medical advice, defer to professional consultation

About OcuNova Platform:
- AI-powered eye disease detection
- Detects: Cataracts, Glaucoma, Diabetic Retinopathy
- Overall accuracy: 96.14%
- Includes AR experience for education
- Developed by students for research/education
- Platform features: image upload, symptom questionnaire, AR visualization

Response Style:
- Be concise but thorough
- Use bullet points for lists when helpful
- Include important disclaimers
- Provide educational value
- Suggest platform features when relevant
- Always end with encouragement to consult professionals for medical concerns`

export async function POST(request: Request) {
  try {
    const { message, conversationHistory } = await request.json()

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      // Fallback responses if no API key
      const fallbackResponses = {
        "accuracy": "Our AI models achieve 96.14% overall accuracy in detecting eye diseases including cataracts, glaucoma, and diabetic retinopathy. However, this is for educational purposes only and not for medical diagnosis.",
        "disease": "We can detect cataracts, glaucoma, and diabetic retinopathy. Remember, this is an educational tool and you should always consult healthcare professionals for medical diagnosis.",
        "medical": "Important: OcuNova is an educational tool only. It should NOT be used for medical diagnosis, treatment, or making healthcare decisions. Always consult qualified medical professionals.",
        "upload": "You can upload eye images on our Detect page. We support JPG/PNG formats. The system will analyze the image and ask symptom questions for better accuracy.",
        "cataract": "Cataracts cause clouding of the eye's lens, leading to blurry vision. Symptoms include blurry vision, faded colors, glare, and poor night vision. Treatment typically involves surgery when vision impairment affects daily activities.",
        "glaucoma": "Glaucoma damages the optic nerve, often due to high eye pressure. It can cause vision loss and blindness if untreated. Regular eye exams are crucial for early detection since symptoms often appear late.",
        "diabetic": "Diabetic retinopathy affects blood vessels in the retina due to diabetes. It can cause vision changes, floaters, and vision loss. Good blood sugar control and regular eye exams are essential for prevention.",
        "default": "I understand you're asking about eye health. As OcuNova AI Assistant, I can provide educational information about eye diseases and our platform features. However, for any medical concerns, please consult with qualified healthcare professionals who can provide proper diagnosis and treatment recommendations."
      }

      const lowerMessage = message.toLowerCase()
      let response = fallbackResponses.default

      if (lowerMessage.includes('accurate') || lowerMessage.includes('accuracy')) {
        response = fallbackResponses.accuracy
      } else if (lowerMessage.includes('disease') || lowerMessage.includes('detect')) {
        response = fallbackResponses.disease
      } else if (lowerMessage.includes('medical') || lowerMessage.includes('diagnosis')) {
        response = fallbackResponses.medical
      } else if (lowerMessage.includes('upload') || lowerMessage.includes('image')) {
        response = fallbackResponses.upload
      } else if (lowerMessage.includes('cataract')) {
        response = fallbackResponses.cataract
      } else if (lowerMessage.includes('glaucoma')) {
        response = fallbackResponses.glaucoma
      } else if (lowerMessage.includes('diabetic')) {
        response = fallbackResponses.diabetic
      }

      return NextResponse.json({ response })
    }

    // Prepare messages for OpenAI
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: message }
    ]

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content || "I apologize, but I'm having trouble generating a response right now."

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error('Chat API error:', error)
    
    // Fallback response
    const fallbackResponse = "I apologize, but I'm experiencing technical difficulties. Please try again in a moment. For urgent medical concerns, please contact healthcare professionals directly."

    return NextResponse.json(
      { response: fallbackResponse },
      { status: 200 } // Still return 200 to avoid breaking the frontend
    )
  }
}