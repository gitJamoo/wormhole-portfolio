import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const dotsArray = ["", ".", "..", "..."];
  const funFacts = [
    "Honey never spoils.",
    "Bananas are berries, but strawberries aren't.",
    "Sharks existed before trees.",
    "Octopuses have three hearts.",
    "Your stomach gets a new lining every 3–4 days.",
  ];

  const [dotIndex, setDotIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(0);

  // Cycle the dots
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % dotsArray.length);
    }, 500); // every 0.5s
    return () => clearInterval(dotsInterval);
  }, []);

  // Cycle the fun facts
  useEffect(() => {
    const factInterval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 4000); // every 4s
    return () => clearInterval(factInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <div className="text-2xl font-bold mb-4">
        Generating content{dotsArray[dotIndex]}
      </div>
      <div className="text-lg text-gray-600 transition-opacity duration-1000 ease-in-out opacity-100">
        Fun Fact: {funFacts[factIndex]}
      </div>
    </div>
  );
}
