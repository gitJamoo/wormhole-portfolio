import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const dotsArray = ["", ".", "..", "..."];
  // const funFacts = [
  //   "Honey never spoils.",
  //   "Bananas are berries, but strawberries aren't.",
  //   "Sharks existed before trees.",
  //   "Octopuses have three hearts.",
  //   "Your stomach gets a new lining every 3–4 days.",
  // ];

  const funFacts = ["James "];

  const [dotIndex, setDotIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Animate dots
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % dotsArray.length);
    }, 500);
    return () => clearInterval(dotsInterval);
  }, []);

  // Rotate fun facts
  useEffect(() => {
    const factInterval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 4000);
    return () => clearInterval(factInterval);
  }, []);

  // Track elapsed time
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-2xl font-bold mb-2">
        Generating content{dotsArray[dotIndex]}
      </div>
      <div className="text-lg text-gray-600 transition-opacity duration-1000 ease-in-out mb-4">
        Fun Fact: {funFacts[factIndex]}
      </div>
      <div className="text-sm text-gray-500">Time elapsed: {elapsedTime}s</div>
    </div>
  );
}
