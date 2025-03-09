"use client";
import { useState, useEffect } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface CareerDetailsProps {
  designation: string;
}

function CareerDetails({ designation }: CareerDetailsProps) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [careerDescription, setCareerDescription] = useState<string>("Fetching career details...");

  useEffect(() => {
    const fetchCareerDescription = async () => {
      try {
        const response = await fetch("/api/getCareerDescription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ career: designation }), 
        });

        const data = await response.json();
        if (data.description) {
          setCareerDescription(data.description);
        } else {
          setCareerDescription("Could not fetch career details.");
        }
      } catch (error) {
        setCareerDescription("Error fetching career details.");
      }
    };

    if (designation) fetchCareerDescription();
  }, [designation]); 
  const careerDetails = [
    {
      title: `Career as a ${designation}`,
      description: careerDescription,
      slug: designation.toLowerCase().replace(/\s+/g, "-"),
    },
    {
      title: "The Art of Songwriting",
      description: "Learn the craft of songwriting from experienced musicians and songwriters.",
      slug: "the-art-of-songwriting",
    },
    {
      title: "Mastering Your Instrument",
      description: "Advanced techniques to master your musical instrument of choice.",
      slug: "mastering-your-instrument",
    },
  ];

  return (
    <div className="p-12 bg-black-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Explore Your Career Path
          </p>
        </div>

        <div className="mt-10">
          <HoverEffect
            items={careerDetails.map((careerDetail) => ({
              title: careerDetail.title,
              description: careerDetail.description,
              link: `/${careerDetail.slug}`,
            }))}
          />
        </div>

        <div className="mt-10 flex flex-col items-center">
          <p className="text-2xl font-semibold">Liked the results?</p>
          <div className="flex gap-6 mt-4">
            <button
              className={`p-3 rounded-full border ${feedback === "like" ? "bg-green-500 text-white" : "border-gray-400 text-gray-400"} transition duration-300 hover:bg-green-500 hover:text-white`}
              onClick={() => setFeedback("like")}
            >
              <ThumbsUp size={24} />
            </button>

            <button
              className={`p-3 rounded-full border ${feedback === "dislike" ? "bg-red-500 text-white" : "border-gray-400 text-gray-400"} transition duration-300 hover:bg-red-500 hover:text-white`}
              onClick={() => setFeedback("dislike")}
            >
              <ThumbsDown size={24} />
            </button>
          </div>

          {feedback && (
            <p className="mt-4 text-sm text-gray-300">
              {feedback === "like" ? "Thanks for your feedback! 😊" : "We'll improve based on your feedback! 🙏"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CareerDetails;
