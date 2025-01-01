import React from "react";

const RuleModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-pink-100 rounded-lg p-6 w-2/3 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Game Rules</h2>
        <p className="text-gray-700 mb-6">
          - Select any number. <br />
          - Click on dice image <br />
          - After click on  dice  if selected number is equal to dice number you will get same point as dice . <br/>
          - If you get wrong guess then  2 point will be dedcuted 
        </p>
        <div className="flex justify-center">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
        >
          Close
        </button>
        </div>
      </div>
    </div>
  );
};

export default RuleModal;
