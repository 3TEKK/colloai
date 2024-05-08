import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3001"; // Your backend server endpoint

const StreamingComponent = () => {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    // Function to start recording when space bar is pressed
    const handleSpaceKeyPress = (event) => {
      if (event.key === " " && !event.repeat) {
        socket.emit("start-recording");
      }
    };

    // Function to stop recording when space bar is released
    const handleSpaceKeyRelease = (event) => {
      if (event.key === " ") {
        socket.emit("stop-recording");
      }
    };

    // Event listeners for space bar press and release
    document.addEventListener("keydown", handleSpaceKeyPress);
    document.addEventListener("keyup", handleSpaceKeyRelease);

    // Clean up event listeners
    return () => {
      document.removeEventListener("keydown", handleSpaceKeyPress);
      document.removeEventListener("keyup", handleSpaceKeyRelease);
    };
  }, []);

  return (
    <div>
      <h1>Press Space bar to start/stop recording</h1>
    </div>
  );
};

export default StreamingComponent;
