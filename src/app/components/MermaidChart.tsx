"use client"
import { useEffect } from "react";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false });

const MermaidChart = ({ code }: { code: string }) => {
  useEffect(() => {
    if (code) {
      mermaid.contentLoaded();
    }
  }, [code]);

  return <div className="mermaid">{code}</div>;
};

export default MermaidChart;
