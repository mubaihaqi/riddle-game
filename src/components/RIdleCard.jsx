import React, { useEffect, useState } from "react";

export default function RidleCard() {
  const [riddleData, setRiddleData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://riddles-api.vercel.app/random")
      .then((res) => res.json())
      .then((data) => {
        setRiddleData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal ambil data: ", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Riddle...</p>;
  if (!riddleData) return <p>Gagal ambil data.</p>;

  return (
    <>
      <div>
        <h1>{riddleData.riddle}</h1>
        <p>{riddleData.answer}</p>
      </div>
    </>
  );
}
