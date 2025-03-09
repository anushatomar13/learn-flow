'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import mermaid from "mermaid";
import { useEffect } from "react";
import MermaidChart from './MermaidChart';

export default function CareerRoadmap() {
  const [career, setCareer] = useState('');
  const [description, setDescription] = useState('');
  const [roadmap, setRoadmap] = useState('');
  const [mermaidCode, setMermaidCode] = useState('');
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    if (mermaidCode) {
      mermaid.contentLoaded();
    }
  }, [mermaidCode]);

  const fetchCareerInfo = async () => {
    if (!career) return;
    setLoading(true);

    try {
      // Fetch career description
      const descRes = await fetch("/api/career-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ career })
      });
      const descData = await descRes.json();
      setDescription(descData.description || "No description available.");
      
      // Fetch roadmap
      const roadmapRes = await fetch("/api/career-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ career })
      });
      const roadmapData = await roadmapRes.json();
      setRoadmap(roadmapData.roadmap || "No roadmap available.");
      setMermaidCode(roadmapData.mermaid || "");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">Career Roadmap Generator</h1>
      <Input 
        placeholder="Enter career (e.g., Software Engineer)" 
        value={career} 
        onChange={(e) => setCareer(e.target.value)}
      />
      <Button onClick={fetchCareerInfo} disabled={loading}>
        {loading ? "Loading..." : "Get Career Roadmap"}
      </Button>
      
      {description && (
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Career Description</h2>
            <p>{description}</p>
          </CardContent>
        </Card>
      )}

      {roadmap && (
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Roadmap</h2>
            <pre className="whitespace-pre-wrap">{roadmap}</pre>
            <MermaidChart code={mermaidCode} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
