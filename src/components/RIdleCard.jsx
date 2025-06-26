import React, { useEffect, useState } from "react";
import SplitText from "./SplitText";
import GradientText from "./GradientText";
import AnimatedContent from "./AnimatedContent";

export default function RiddleCard() {
  const [riddleData, setRiddleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const fetchRiddle = async () => {
    setLoading(true);
    setError(null);
    setShowAnswer(false);
    try {
      const response = await fetch("https://riddles-api.vercel.app/random");
      if (!response.ok) {
        throw new Error(`Gagal mengambil data. Status: ${response.status}`);
      }
      const data = await response.json();
      setRiddleData(data);
    } catch (err) {
      console.error("Gagal ambil data: ", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiddle();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <p className="text-center text-lg animate-pulse">Loading Riddle...</p>
      );
    }
    if (error) {
      return <p className="text-center text-red-400">Error: {error}</p>;
    }
    if (!riddleData) {
      return <p className="text-center">Tidak ada teka-teki yang ditemukan.</p>;
    }

    return (
      <>
        <div className="mb-6 min-h-[8rem] flex items-center justify-center">
          <SplitText
            key={riddleData.riddle}
            text={riddleData.riddle}
            className="text-lg sm:text-xl font-light text-center break-words whitespace-pre-wrap leading-relaxed"
            delay={50}
            duration={0.1}
            ease="power2.out"
            splitType="chars"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-md transition duration-300 pointer-events-auto"
          >
            {showAnswer ? "Hide" : "See"} Answer
          </button>
          <button
            onClick={fetchRiddle}
            className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-md transition duration-300 pointer-events-auto"
          >
            New Riddles
          </button>
        </div>
        {showAnswer && (
          <div className="mt-6 p-4 bg-slate-800/80 rounded-md transition-opacity duration-500 pointer-events-auto">
            <p className="text-center font-bold">
              Answer: <span className="font-normal">{riddleData.answer}</span>
            </p>
          </div>
        )}
      </>
    );
  };

  return (
    <AnimatedContent
      distance={150}
      direction="vertical"
      reverse={false}
      duration={1.2}
      ease="power3.out"
      initialOpacity={0.2}
      animateOpacity
      scale={0.5}
      threshold={0.1}
      delay={0.1}
    >
      <div className="max-w-sm lg:min-w-3xl lg:max-w-2xl bg-slate-600/50 border-slate-700 backdrop-blur-md mx-auto rounded-xl border-2 p-8 text-white shadow-2xl">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={6}
          showBorder={false}
          className="text-4xl font-black text-center mb-6 py-2 px-4"
        >
          Random Riddles
        </GradientText>
        {renderContent()}
      </div>
    </AnimatedContent>
  );
}
