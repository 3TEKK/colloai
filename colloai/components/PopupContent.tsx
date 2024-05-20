import React from "react";

const PopupContent = ({ handleClosePopup }) => (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
    <div className="absolute bg-white shadow-lg rounded-lg p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-6">Good Job!</h1>
      <div className="flex justify-around text-center mb-6">
        <div>
          <div className="gauge vocabulary"></div>
          <p className="text-sm font-semibold mt-2">Vocabulary</p>
          <p className="text-sm text-gray-500">25.71%</p>
        </div>
        <div>
          <div className="gauge confidence"></div>
          <p className="text-sm font-semibold mt-2">Confidence</p>
          <p className="text-sm text-gray-500">25.71%</p>
        </div>
        <div>
          <div className="gauge speech"></div>
          <p className="text-sm font-bold mt-2">Speech Analysis</p>
          <p className="text-sm text-gray-500">70.71%</p>
        </div>
      </div>
      <div className="bg-blue-100 p-4 mb-6">
        <p className="text-sm mb-4">Here’s how you could have answered this question better</p>
        <p className="text-sm">You effectively highlighted your ability to communicate and coordinate with team members from different departments, which is a valuable skill in our organization. However, I noticed that you could further enhance your response by providing specific examples of challenges you faced and how you successfully resolved them within these teams.</p>
        <div className="flex justify-between mt-4">
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded">Question 1</button>
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded">Question 2</button>
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded">Question 3</button>
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded">Question 4</button>
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded">Question 5</button>
        </div>
      </div>
      <div className="flex justify-between">
        <button className="bg-red-500 text-white py-2 px-4 rounded">Try Again</button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleClosePopup}>OK</button>
      </div>
    </div>
  </div>
);

export default PopupContent;