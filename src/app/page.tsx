"use client";
import { useState, useRef } from "react";
import CareerForm from "./components/CareerForm";
import CareerDetails from "./components/CareerDetails";
import Footer from "./components/Footer";

export default function Home() {
  const [showDetails, setShowDetails] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

const handleExploreClick = (designation: string, location: string) => {
  setSelectedCareer(designation);
  setSelectedLocation(location);
  setShowDetails(true);

  setTimeout(() => {
    detailsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 300);
};


  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col items-center p-8 sm:p-20">
        <CareerForm onExploreClick={handleExploreClick} />

        <div className={showDetails ? "mt-10" : "mt-4"}></div>

        {showDetails && selectedCareer && selectedLocation && (
  <div ref={detailsRef} className="mt-6">
    <CareerDetails designation={selectedCareer} location={selectedLocation} />
  </div>
)}

      </div>

      <Footer />
    </div>
  );
}
