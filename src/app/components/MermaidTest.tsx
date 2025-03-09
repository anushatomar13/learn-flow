"use client";
import { useEffect } from "react";
import mermaid from "mermaid";

export default function MermaidChart() {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded();
  }, []);

  const mermaidCode = `
    graph TD;
      A[Start] --> B[Process];
      B --> C[End];
  `;

  return (
    <div className="p-4 border rounded-lg">
      <div className="mermaid">{mermaidCode}</div>
    </div>
  );
}
