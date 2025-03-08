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
          { role: "user", content: `Give a step-by-step roadmap to become a ${career}. Format each step like: Step 1: ..., Step 2: ..., etc.` }
        ],
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      const roadmapText = data.choices[0].message.content;

      // Convert roadmap into Mermaid.js format
      let mermaidFlowchart = "graph TD;\n";
      const steps = roadmapText.split("\n").filter((line: string) => line.startsWith("Step"));

      for (let i = 0; i < steps.length; i++) {
        mermaidFlowchart += `  step${i}["${steps[i].replace("Step ", "")}"];\n`;
        if (i > 0) {
          mermaidFlowchart += `  step${i - 1} --> step${i};\n`;
        }
      }

      return NextResponse.json({ roadmap: roadmapText, mermaid: mermaidFlowchart });
    } else {
      return NextResponse.json({ error: "Invalid response from Groq API", fullResponse: data }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error fetching data", details: (error as Error).message }, { status: 500 });
  }
}
