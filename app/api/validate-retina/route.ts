import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString("base64");

    // ✅ Correct OpenAI Responses API call
    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `You are an ophthalmology expert.
Determine if this image is a human retinal fundus photograph.
Return ONLY valid JSON with keys:
"isRetinal" (boolean), "confidence" (0–1), and "reason" (string).`,
              },
              {
                type: "input_image",
                image_url: `data:${file.type};base64,${base64Image}`,
              },
            ],
          },
        ],
        // ✅ this is the correct format as of 2025-10
        text: {
          format: { type: "json_object" },
        },
      }),
    });

    const result = await openaiResponse.json();
    console.log("🧠 Raw OpenAI result:", JSON.stringify(result, null, 2));

    // ✅ Try to extract text from any possible field
    const rawText: string | undefined =
      result.output_text ??
      result.output?.[0]?.content?.[0]?.text ??
      result.choices?.[0]?.message?.content ??
      "";

    if (!rawText || typeof rawText !== "string" || rawText.trim() === "") {
      console.warn("⚠️ Model returned no text; using fallback object.");
      return NextResponse.json(
        {
          isRetinal: false,
          confidence: 0,
          reason: "Model returned no readable output. Please try again.",
          fallback: true,
        },
        { status: 200 }
      );
    }

    // 🧼 Parse JSON safely (handles ```json code blocks etc.)
    const match = rawText.match(/\{[\s\S]*\}/);
    const parsed = match ? JSON.parse(match[0]) : JSON.parse(rawText);

    // ✅ Verify keys exist
    if (typeof parsed.isRetinal === "undefined") {
      parsed.isRetinal = false;
      parsed.confidence = 0;
      parsed.reason = "Missing keys; assumed non-retinal.";
    }

    return NextResponse.json(parsed, { status: 200 });
  } catch (error: any) {
    console.error("❌ Validation route error:", error);
    return NextResponse.json(
      {
        error: "Validation failure",
        message: error.message ?? "Unknown error",
        isRetinal: false,
        confidence: 0,
        reason: "Server error during validation.",
      },
      { status: 200 } // prevent frontend crash
    );
  }
}
