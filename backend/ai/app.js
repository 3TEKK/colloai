const express = require('express');
const bodyParser = require('body-parser');
const { startRecording, stopRecordingAndProcess } = require('./index.js'); // Assuming you have separated the audio functions into a separate file
const { transcribeAndChat } = require('./index.js'); // Similarly, assuming chat functions are in a separate file
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Route to start recording
app.post('/startRecording', (req, res) => {
    startRecording();
    res.send('Recording started');
});

// Route to stop recording and process audio
app.post('/stopRecording', (req, res) => {
    stopRecordingAndProcess();
    res.send('Recording stopped, processing audio...');
});

// Route to transcribe audio and chat
app.post('/transcribeAndChat', async (req, res) => {
    await transcribeAndChat();
    res.send('Transcription and chat initiated');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
