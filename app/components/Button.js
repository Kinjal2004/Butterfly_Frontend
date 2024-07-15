import React, { useState } from 'react';
import axios from 'axios';

const Button = ({ file, onFileUpload }) => {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    setLoading(true); // Set loading state to true during file upload

    try {
      const formData = new FormData();
      formData.append('image', file);
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
