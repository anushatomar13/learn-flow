"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";


export default function CareerForm() {
  const [career, setCareer] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCareerInfo = async () => {
    if (!career) return;
    setLoading(true);

    try {
      const descRes = await fetch("/api/getCareerDescription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ career }),
      });

      const descData = await descRes.json();
      setDescription(descData.description || "No description available.");
    } catch (error) {
      console.error("Error fetching career description:", error);
      setDescription("Failed to fetch career description.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen mt-10 px-4">
  {/* Heading */}
  <h1 className="text-3xl md:text-4xl text-center font-semibold">
    What do you want to become?
  </h1>

  {/* Inputs + Button Container */}
  <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6 mt-10 items-end justify-center">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-col">
        <p className="text-lg md:text-xl font-medium mb-1">Designation</p>
        <input
          value={career}
          onChange={(e) => setCareer(e.target.value)}
          type="text"
          placeholder="Enter here"
          className="w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <p className="text-lg md:text-xl font-medium mb-1">Time Period</p>
        <input
          type="text"
          placeholder="Enter here"
          className="w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>

    <div className="flex flex-col">
      <p className="text-lg md:text-xl font-medium mb-1">Location</p>
      <input
        type="text"
        placeholder="Enter here"
        className="w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <Button
      onClick={fetchCareerInfo}
      className="w-32 h-[2.7rem] md:ml-4 transform hover:scale-105 transition duration-200 border border-blue-500 hover:backdrop-blur-md"
    >
      {loading ? "Loading..." : "Let's explore"}
    </Button>
  </div>

  {/* Ensure Card is Positioned Correctly */}
 
</div>


  );
}
