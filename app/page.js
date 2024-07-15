"use client"
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import FileInput from './components/FileInput';
import Hero from './components/Hero';
import PredictionBar from './components/PredictionBar';

export default function Home() {
  const [predictionData, setPredictionData] = useState(null);

  const handlePredictionData = (data) => {
    setPredictionData(data);
  };

  return (
    <main className="h-screen">
      <NavBar />
      <Hero />  
      <div className="w-full flex justify-center p-4">
        <FileInput onUpload={handlePredictionData} />
      </div>
      <div className="w-full flex justify-center p-4">
        <PredictionBar predictionData={predictionData} />
      </div>
    </main>
  );
}
