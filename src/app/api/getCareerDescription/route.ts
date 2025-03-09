import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { career } = await req.json();
    
    if (!career) {
      return NextResponse.json({ error: "Career is required" }, { status: 400 });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { 
            role: "user", 
            content: `Describe ${career} in exactly four lines as if advising someone who wants to pursue it as a career. Include how this career contributes to society. Do not use phrases like "Here's your description"—just provide the response directly. Write in the second-person perspective ("you").`
          }
          
        ],
      }),
    });

    const data = await response.json();
    console.log("Groq API Response:", JSON.stringify(data, null, 2));

    if (data.choices && data.choices.length > 0) {
      return NextResponse.json({ description: data.choices[0].message.content });
    } else {
      return NextResponse.json({ error: "Invalid response from Groq API", fullResponse: data }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error fetching data", details: (error as Error).message }, { status: 500 });
  }
}
