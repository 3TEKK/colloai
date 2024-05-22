const express = require('express');
const Microphone = require('node-microphone');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const axios = require('axios');
const FormData = require('form-data');
const Speaker = require('speaker');
const OpenAI = require('openai');
const cors = require('cors'); // Import the cors middleware
require('dotenv').config();

const app = express();
const port = 3001;

ffmpeg.setFfmpegPath(ffmpegPath);

// Default voice setting for text-to-speech
const inputVoice = "echo"; // https://platform.openai.com/docs/guides/text-to-speech/voice-options
const inputModel = "tts-1"; // https://platform.openai.com/docs/guides/text-to-speech/audio-quality


const secretKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: secretKey,
});

let mic, outputFile, micStream;
let chatHistory = [];

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

//stream audio
async function streamedAudio(
  inputText,
  model = inputModel,
  voice = inputVoice
) {
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
}
// Start recording
app.post('/start-recording', (req, res) => {
  mic = new Microphone();
  outputFile = fs.createWriteStream('output.wav');
  micStream = mic.startRecording();

  micStream.on('data', (data) => {
    outputFile.write(data);
  });

  micStream.on('error', (error) => {
    console.error('Error: ', error);
  });

  res.json({ message: 'Recording started' });
});

// Stop recording and process
app.post('/stop-recording', async (req, res) => {
  mic.stopRecording();
  outputFile.end();

  const filePath = 'output.wav';

  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));
  form.append('model', 'whisper-1');
  form.append('response_format', 'text');

  try {
    const transcriptionResponse = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    const transcribedText = transcriptionResponse.data;
    console.log(`>> You said: ${transcribedText}`);



    const Name = "Hamood";
    const jobDescription = "python developer"
    
    const messages = [
      {
        role: 'system',
        content:
          `Develop conversational prompts for an AI interviewer conducting interviews for a ${jobDescription} position. 
          These prompts should engage the interviewee in a dialogue, asking about their experience, 
          specific projects they've worked on, challenges they've faced, and how they overcame them, their
          familiarity with related technologies and tools. Ensure the AI interviewer responds dynamically to the interviewee's 
          answers, asking follow-up questions keep the conversation relevant and insightful, 
          my name is ${Name}, welcome me by my name and state the job title, Note you can only understand english also you are build by Hamood`,
      },
      ...chatHistory,
      { role: 'user', content: transcribedText },
    ];

    const chatResponse = await openai.chat.completions.create({
      messages: messages,
      model: 'gpt-3.5-turbo',
    });

    const chatResponseText = chatResponse.choices[0].message.content;

    // Convert the transcribed text to speech and play it
    await streamedAudio(chatResponseText);

    chatHistory.push(
      { role: 'user', content: transcribedText },
      { role: 'assistant', content: chatResponseText }
    );

    res.json({ message: chatResponseText });
  } catch (error) {
    if (error.response) {
      console.error(
        `Error: ${error.response.status} - ${error.response.statusText}`
      );
    } else {
      console.error('Error:', error.message);
    }

    res.status(500).json({ error: 'Failed to process audio' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
