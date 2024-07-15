import React, { useState } from "react";
import butter_data from './butter_data.json';

const InfoModal = ({ insectName, modalId }) => {
  const [description, setDescription] = useState("");
  const [wikiLink, setWikiLink] = useState("");
  const [imageLink, setImageLink] = useState("");

  const handleOpen = () => {
    const insectData = butter_data.find(butterfly => butterfly.name === insectName);
    if (insectData) {
      setDescription(insectData.description);
      setWikiLink(insectData.wikipedia_link);
      setImageLink(insectData.image_link);
    }
    document.getElementById(modalId).showModal();
  };

  const handleClose = () => {
    document.getElementById(modalId).close();
  };

  return (
    <div>
      {/* Open Modal Button */}
      <button
        className="text-info active ml-2 mt-1"
        onClick={handleOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {/* Modal */}
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{insectName}</h3>
          {/* Display fetched description */}
          <p className="py-4">{description}</p>
          {wikiLink && (
            <a href={wikiLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              Wikipedia
            </a>
          )}
          <div className="modal-action">
            {/* Close Button */}
            <button className="btn" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default InfoModal;
