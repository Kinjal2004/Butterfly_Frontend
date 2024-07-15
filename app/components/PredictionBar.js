import React, { useState } from 'react';
import InfoModal from './InfoModal';

const PredictionBar = ({ predictionData }) => {
  const [data, setData] = useState(null);

  // Update data state when predictionData prop changes
  if (predictionData && predictionData !== data) {
    setData(predictionData);
  }

  return (
    <div className="flex flex-col ml-1">
      {data && data.predictions.map((prediction, idx) => (
        <div key={idx} className="flex mb-1">
          <p className="mr-2 mt-0.5 font-mono text-sm">{prediction[0]}</p>
          <div className="w-56">
            <progress className="progress" value={prediction[1] * 100} max="100"></progress>
          </div>
          <InfoModal insectName={prediction[0]} modalId ={idx}/>
        </div>
      ))}
    </div>
  );
};

export default PredictionBar;
