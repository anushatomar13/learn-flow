"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CareerForm({ onExploreClick }: { onExploreClick: (designation: string) => void }) {
  const [designation, setDesignation] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="flex flex-col items-center justify-start px-4 mt-90">
      <h1 className="text-6xl md:text-4xl text-center font-semibold">
        What do you want to become?
      </h1>

      <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6 mt-10 items-end justify-center">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col">
            <p className="text-lg md:text-xl font-medium mb-1">Designation</p>
            <input
              type="text"
              placeholder="Enter here"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-lg md:text-xl font-medium mb-1">Time Period</p>
            <input
              type="text"
              placeholder="Enter here"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-lg md:text-xl font-medium mb-1">Location</p>
          <input
            type="text"
            placeholder="Enter here"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <Button
          onClick={() => onExploreClick(designation)}
          className="w-32 h-[2.7rem] md:ml-4 transform hover:scale-105 transition duration-200 border border-blue-500 hover:backdrop-blur-md"
        >
          Explore
        </Button>
      </div>
    </div>
  );
}
