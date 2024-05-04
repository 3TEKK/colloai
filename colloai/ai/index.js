// Import required modules
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

// Set the path for FFmpeg, used for audio processing
ffmpeg.setFfmpegPath(ffmpegPath);

// Initialize OpenAI API client with the provided API key
const secretKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: secretKey,
});

// Variables to store chat history and other components
let chatHistory = []; // To store the conversation history
let mic, outputFile, micStream, rl; // Microphone, output file, microphone stream, and readline interface

console.log(
  `\n# # # # # # # # # # # # # # # # # # # # #\n# Welcome to AI-Interview #\n# # # # # # # # # # # # # # # # # # # # #\n`
);

// Function to set up the readline interface for user input
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

// Function to start recording audio from the microphone
const startRecording = () => {
  mic = new Microphone();
  outputFile = fs.createWriteStream("output.wav");
  micStream = mic.startRecording();

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
  mic.stopRecording();
  outputFile.end();
  console.log(`Recording stopped, processing audio...`);
  transcribeAndChat(); // Transcribe the audio and initiate chat
};

// Default voice setting for text-to-speech
const inputVoice = "echo"; // https://platform.openai.com/docs/guides/text-to-speech/voice-options
const inputModel = "tts-1"; // https://platform.openai.com/docs/guides/text-to-speech/audio-quality

// Function to convert text to speech and play it using Speaker
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

// Function to transcribe audio to text and send it to the chatbot
async function transcribeAndChat() {
  const filePath = "output.wav";
  // note that the file size limitations are 25MB for Whisper

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
    let Name = 'Hamood'
    const jobDescription = `
About the job
Mapbox is the leading real-time location platform for a new generation of location-aware businesses. Mapbox is the only platform that equips organizations with the full set of tools to power the navigation of people, packages, and vehicles everywhere. More than 3.9 million registered developers have chosen Mapbox because of the platform’s flexibility, security, and privacy compliance. Organizations use Mapbox applications, data, SDKs, and APIs to create customized and immersive experiences that delight their customers.

What We Do

Mapbox is looking to hire motivated, curious, and innovative API Software Development Engineers (SDEs) for product teams in our Maps and Navigation organizations. These teams utilize a centralized hiring model where they combine their hiring efforts offering candidates the opportunity to choose which team to join.

Below are the teams that work together to hire API SDEs at Mapbox:

Maps API - We build and maintain the applications and infrastructure responsible for creating and distributing Mapbox Maps. Our team maintains the highest-traffic read APIs at Mapbox and the distributed ETL pipelines used by internal and external customers to turn data into maps. We’re building new ways for people to visualize location data.
Logistics API - We are a group of innovators creating solutions to challenges in the delivery space from resource planning to delivery execution and beyond. We solve complex geospatial data problems and leverage algorithms and statistical analysis for use cases ranging from distribution strategy to delivery route planning for fleets from dozens to thousands of vehicles. 
Directions API - We develop and maintain the web services powering virtually all of Mapbox’s strategic navigation initiatives in consumer, automotive, and logistics. We are a highly multidisciplinary team with work spanning from distributed systems on AWS to geospatial localization, traffic telemetry, and mapping.

What You'll Do

As a Software Development Engineer II, API at Mapbox, you'll play a key role in developing software for complex mapping and navigation software for cars, web, and mobile devices.

In This Role, You Can Expect To

Collaborate with your team to identify and scope out well-defined tasks.
Execute on the scope and be accountable for delivering on time with quality.
Design systems and make decisions that will keep pace with the rapid growth of Mapbox’s customer base.
Promote a culture of operational excellence by meticulously testing and monitoring our systems and code, writing documentation, and being on-call to support the health of our services.
Reduce technical debt, share your knowledge, and invest in your teammates’ health and happiness, while optimizing application performance and accelerating feature velocity.
Uphold a culture of collaboration, transparency, creativity, inclusion, and data-driven decisions.

What We Believe Are Important Traits For This Role

5+ years of experience building scalable high volume low latency backend services
Proficiency in our tech stack — Python, NodeJS, TypeScript (backend), AWS (CDK, ECS, Fargate, Step Functions, Lambda, S3, etc.)
Familiarity with code versioning tools, such as GitHub
Ability to engage, learn and contribute quickly to the initiatives
Able to perform independently all the development tasks, based on designs and specs.
Self-starter who is communication and outcomes-oriented
An empirical analytical approach. You develop strong hypotheses, conduct spikes, and clearly communicate your findings
A desire to share your expertise through documentation, mentorship, pairing and both written and verbal discussion
A desire to work with individuals with diverse backgrounds, perspectives, and experiences
High quality mindset -- write unit tests, proactively remedy defects and follow through to production

Nice to Have Traits for This Role 

Experience and knowledge within the mapping domain
Experience with Amazon RDS
Experience with SQL
Experience with various security standards and associated technical knowledge

What We Value

In addition to our core values, which are not unique to this position and are necessary for Mapbox leaders:

We value high-performing creative individuals who dig into problems and opportunities.
We believe in individuals being their whole selves at work. We commit to this through supportive health care, parental leave, flexibility for the things that come up in life, and innovating on how we think about supporting our people.
We emphasize an environment of teaching and learning to equip employees with the tools needed to be successful in their function and the company.
We strongly believe in the value of growing a diverse team and encourage people of all backgrounds, genders, ethnicities, abilities, and sexual orientations to apply.
`;

    // Prepare messages for the chatbot, including the transcribed text
    const messages = [
      {
        role: "system",
        content:
          `Develop conversational prompts for an AI interviewer conducting interviews for a ${jobDescription} position. 
          These prompts should engage the interviewee in a dialogue, asking about their experience, 
          specific projects they've worked on, challenges they've faced, and how they overcame them, their
          familiarity with related technologies and tools. Ensure the AI interviewer responds dynamically to the interviewee's 
          answers, asking follow-up questions keep the conversation relevant and insightful, 
          my name is ${Name},welcome me by my name and state the job title, Note you can only understand english also you are build by Hamood`,
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
    console.log("Press Enter to speak again, or any other key to quit.\n");
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

// Initialize the readline interface
setupReadlineInterface();
