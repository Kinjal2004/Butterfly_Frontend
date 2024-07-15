import React, { useState } from "react";
import Button from "./Button";
import Image from "./Image";

const FileInput = ({ onUpload }) => {
  const [bgImage, setBgImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setBgImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (data) => {
    // Call parent component's callback with the response data
    if (onUpload) {
      onUpload(data);
    }
  };

  return (
    <div>
      <Image bgImage={bgImage} />
      <div className="flex">
        <input
          type="file"
          accept="image/jpeg"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleFileChange}
        />
        <Button file={selectedFile} onFileUpload={handleFileUpload} />
      </div>
      <div className="text-red-500 text-sm mt-3">
        Note: Prediction results may take upto 50 seconds for loading.
        <br />
        Only JPEG Supported
      </div>
    </div>
  );
};

export default FileInput;
