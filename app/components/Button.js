import React, { useState } from 'react';
import axios from 'axios';
import Pica from 'pica';

const Button = ({ file, onFileUpload }) => {
  const [loading, setLoading] = useState(false);

  const compressImage = async (file) => {
    const pica = new Pica();

    const img = new Image();
    img.src = URL.createObjectURL(file);

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const resizedCanvas = document.createElement('canvas');
    const newWidth = 300; // Set new width to 300 pixels
    const aspectRatio = img.height / img.width;
    resizedCanvas.width = newWidth;
    resizedCanvas.height = newWidth * aspectRatio;

    await pica.resize(canvas, resizedCanvas);

    return new Promise((resolve) => {
      resizedCanvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.8); // Adjust the quality parameter as needed
    });
  };

  const handleFileUpload = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    setLoading(true); // Set loading state to true during file upload

    try {
      const compressedFile = await compressImage(file);

      const formData = new FormData();
      formData.append('image', compressedFile, file.name);

      const response = await axios.post('https://butterfly-classification-real.onrender.com/predict', formData);

      onFileUpload(response.data); // Pass data to parent component
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  return (
    <div>
      <button className="btn btn-accent ml-4" onClick={handleFileUpload} disabled={loading}>
        {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Predict'}
      </button>
    </div>
  );
};

export default Button;
