const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const Microphone = require("node-microphone");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const readline = require("readline");
const axios = require("axios");
const FormData = require("form-data");
const Speaker = require("speaker");
const OpenAI = require("openai");
require("dotenv").config();

ffmpeg.setFfmpegPath(ffmpegPath);

const app = express();
app.use(bodyParser.json());

const server = http.createServer(app);
const io = socketIO(server); // Integrate Socket.IO with your server

// Initialize OpenAI API client with the provided API key
const secretKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: secretKey,
});

let chatHistory = [];
let mic, outputFile, micStream, rl;

const startRecording = () => {
  mic = new Microphone();
  outputFile = fs.createWriteStream("output.wav");
  micStream = mic.startRecording();

  micStream.on("data", (data) => {
    outputFile.write(data);
  });

  micStream.on("error", (error) => {
    console.error("Error: ", error);
  });

  console.log("Recording... Press Space bar to stop");
};

const stopRecordingAndProcess = () => {
  mic.stopRecording();
  outputFile.end();
  console.log(`Recording stopped, processing audio...`);
  transcribeAndChat();
};

const streamedAudio = async (inputText, model = "tts-1", voice = "echo") => {
    const url = "https://api.openai.com/v1/audio/speech";
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
};

const transcribeAndChat = async (name, jobDescription) => {
    const filePath = "output.wav";

  // Prepare form data for the transcription request
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath));
  form.append("model", "whisper-1");
  form.append("response_format", "text");

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

};

app.post("/AI", async (req, res) => {
  try {
    const { name, jobDescription } = req.body;
    await transcribeAndChat(name, jobDescription);
    res.status(200).send("Interview completed!");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

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

setupReadlineInterface();

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Socket.IO integration
io.on("connection", (socket) => {
  console.log("Client connected");

  // Handle start recording event
  socket.on("start-recording", () => {
    if (!micStream) {
      startRecording();
    }
  });

  // Handle stop recording event
  socket.on("stop-recording", () => {
    if (micStream) {
      stopRecordingAndProcess();
    }
  });
});
