"use client"
import { useState } from "react";
import CareerForm from "./components/CareerForm";
import CareerDetails from "./components/CareerDetails";

export default function Home() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <CareerForm onExplore={() => setShowDetails(true)} />

      {showDetails && (
        <div className="mt-70">
          <CareerDetails />
        </div>
      )}
    </div>
  );
}
