// app/api/chat/route.ts or pages/api/chat.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message?.trim()) {
      return NextResponse.json({ reply: "Please provide a message." }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant for a 3D web chatbot." },
        { role: "user", content: message },
      ],
      temperature: 0.7,
    });

    const reply = response.choices?.[0]?.message?.content?.trim() || "Sorry, I could not generate a response.";
    return NextResponse.json({ reply });

  } catch (err: any) {
    console.error("OpenAI API error:", err?.response?.data || err.message || err);
    return NextResponse.json({ reply: "Error contacting AI." }, { status: 500 });
  }
}
