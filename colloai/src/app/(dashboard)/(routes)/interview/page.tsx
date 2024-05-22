"use client";
import { useState } from 'react'; // Import useState hook
import axios from 'axios';
import Dashboard from '../dashboard/page';

export default function Interview() {
  const [isRecording, setIsRecording] = useState(false); // State to track recording status

  const handleStartRecording = async () => {
    try {
      await axios.post('http://localhost:3001/start-recording');
      console.log('Recording started');
      setIsRecording(true); // Update state to indicate recording is active
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const handleStopRecording = async () => {
    try {
      const response = await axios.post('http://localhost:3001/stop-recording');
      console.log('Recording stopped');
      console.log(response.data.message); // AI response
      setIsRecording(false); // Update state to indicate recording is stopped
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <Dashboard currentPage="/interview" />
      </div>
      <div className="bg-white flex items-center justify-center h-80">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-20">Job Interview</h1>
          {/* Conditionally render start or stop recording button based on recording status */}
          {isRecording ? (
            <button
              onClick={handleStopRecording}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Stop Recording
            </button>
          ) : (
            <button
              onClick={handleStartRecording}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Recording
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
