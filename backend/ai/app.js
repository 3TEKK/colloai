// Import required modules
const express = require("express"); // Express framework for handling HTTP requests
const bodyParser = require("body-parser"); // Middleware to parse incoming request bodies
const Microphone = require("node-microphone"); // Module to access the system's microphone
const fs = require("fs"); // File system module to handle file operations
const ffmpeg = require("fluent-ffmpeg"); // Module to handle audio and video processing
const ffmpegPath = require("ffmpeg-static"); // Path to FFmpeg binary
const readline = require("readline"); // Module to handle readable command-line interfaces
const axios = require("axios"); // HTTP client for making requests
const FormData = require("form-data"); // Constructor for creating HTML form data
const Speaker = require("speaker"); // Output audio streams to the speakers
const OpenAI = require("openai"); // OpenAI SDK for accessing OpenAI APIs
require("dotenv").config(); // Load environment variables from .env file

// Set the path for FFmpeg, used for audio processing
ffmpeg.setFfmpegPath(ffmpegPath);

// Initialize OpenAI API client with the provided API key
const secretKey = process.env.OPENAI_API_KEY; // Retrieve API key from environment variables
const openai = new OpenAI({
  apiKey: secretKey,
});

// Variables to store chat history and other components
let chatHistory = []; // Array to store the conversation history
let mic, outputFile, micStream, rl; // Variables for microphone, output file, microphone stream, and readline interface

// Function to start recording audio from the microphone
const startRecording = () => {
  mic = new Microphone(); // Initialize microphone
  outputFile = fs.createWriteStream("output.wav"); // Create a writable stream for the output file
  micStream = mic.startRecording(); // Start recording and get the stream

  // Write incoming data to the output file
  micStream.on("data", (data) => {
    outputFile.write(data);
  });

  // Handle microphone errors
  micStream.on("error", (error) => {
    console.error("Error: ", error);
  });

  console.log("Recording... Press Space bar to stop");
};

// Function to stop recording and process the audio
const stopRecordingAndProcess = () => {
  mic.stopRecording(); // Stop the microphone recording
  outputFile.end(); // Close the writable stream
  console.log(`Recording stopped, processing audio...`);
  transcribeAndChat(); // Transcribe the audio and initiate chat
};

// Function to convert text to speech and play it using Speaker
async function streamedAudio(
  inputText,
  model = "tts-1",
  voice = "echo"
) {
  const url = "https://api.openai.com/v1/audio/speech"; // API endpoint for text-to-speech
  const headers = {
    Authorization: `Bearer ${secretKey}`, // API key for authentication
  };

  const data = {
    model: model,
    input: inputText,
    voice: voice,
    response_format: "mp3",
  };

  try {
    // Make a POST request to the OpenAI audio API
    const response = await axios.post(url, data, {
      headers: headers,
      responseType: "stream",
    });

    // Configure speaker settings
    const speaker = new Speaker({
      channels: 2, // Stereo audio
      bitDepth: 16,
      sampleRate: 44100,
    });

    // Convert the response to the desired audio format and play it
    ffmpeg(response.data)
      .toFormat("s16le")
      .audioChannels(2)
      .audioFrequency(44100)
      .pipe(speaker);
  } catch (error) {
    // Handle errors from the API or the audio processing
    if (error.response) {
      console.error(
        `Error with HTTP request: ${error.response.status} - ${error.response.statusText}`
      );
    } else {
      console.error(`Error in streamedAudio: ${error.message}`);
    }
  }
}

// Function to transcribe audio to text and send it to the chatbot
async function transcribeAndChat(name, jobDescription) {
  const filePath = "output.wav"; // Path to the recorded audio file

  // Prepare form data for the transcription request
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath)); // Append the audio file
  form.append("model", "whisper-1"); // Specify the transcription model
  form.append("response_format", "text"); // Specify the response format

  try {
    // Post the audio file to OpenAI for transcription
    const transcriptionResponse = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    // Extract transcribed text from the response
    const transcribedText = transcriptionResponse.data;
    console.log(`>> You said: ${transcribedText}`);

    // Prepare messages for the chatbot, including the transcribed text
    const messages = [
      {
        role: "system",
        content: `Develop conversational prompts for an AI interviewer conducting interviews for a ${jobDescription} position. These prompts should engage the interviewee in a dialogue, asking about their experience, specific projects they've worked on, challenges they've faced, and how they overcame them, their familiarity with related technologies and tools. Ensure the AI interviewer responds dynamically to the interviewee's answers, asking follow-up questions keep the conversation relevant and insightful, my name is ${name}, welcome me by my name and state the job title, Note you can only understand English also you are built by Hamood`,
      },
      ...chatHistory,
      { role: "user", content: transcribedText },
    ];

    // Send messages to the chatbot and get the response
    const chatResponse = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
    });

    // Extract the chat response.
    const chatResponseText = chatResponse.choices[0].message.content;

    // Update chat history with the latest interaction
    chatHistory.push(
      { role: "user", content: transcribedText },
      { role: "assistant", content: chatResponseText }
    );
    //console.log(chatHistory) saved all chats

    // Convert the chat response to speech and play + log it to the terminal
    await streamedAudio(chatResponseText);
    console.log(`>> Assistant said: ${chatResponseText}`);

    // Reset microphone stream and prompt for new recording
    micStream = null;
    console.log("Press space to speak again, or any other key to quit.\n");
  } catch (error) {
    // Handle errors from the transcription or chatbot API
    if (error.response) {
      console.error(
        `Error: ${error.response.status} - ${error.response.statusText}`
      );
    } else {
      console.error("Error:", error.message);
    }
  }
}

// Initialize Express app
const app = express();
app.use(bodyParser.json()); // Use bodyParser middleware to parse JSON requests

// Endpoint for AI interview
app.post("/AI", async (req, res) => {
  try {
    const { name, jobDescription } = req.body; // Extracting name and jobDescription from request body
    await transcribeAndChat(name, jobDescription); // Pass name and jobDescription to transcribeAndChat function
    res.status(200).send("Interview completed!");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500). send("Internal Server Error");
  }
});

// Set up the readline interface for user input
const setupReadlineInterface = () => {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true, // Make sure the terminal can capture keypress events
  });

  readline.emitKeypressEvents(process.stdin, rl);

  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }

  // Handle keypress events
  process.stdin.on("keypress", (str, key) => {
    if (
      key &&
      (key.name.toLowerCase() === "space" ||
        key.name.toLowerCase() === "space")
    ) {
      if (micStream) {
        stopRecordingAndProcess();
      } else {
        startRecording();
      }
    } else if (key && key.ctrl && key.name === "c") {
      process.exit(); // Handle ctrl+c for exiting
    } else if (key) {
      console.log("Exiting application...");
      process.exit(0);
    }
  });

  console.log("Press Space bar when you're ready to start speaking.");
};

// Initialize the readline interface
setupReadlineInterface();

// Port configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
