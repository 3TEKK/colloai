import axios from 'axios';
import { useEffect } from 'react';


// Send a POST request to start recording
const startRecording = async () => {
    try {
        await axios.post('http://localhost:3001/startRecording');
        console.log('Recording started');
    } catch (error) {
        console.error('Error starting recording:', error);
    }
};

// Send a POST request to stop recording and process audio
const stopRecordingAndProcess = async () => {
    try {
        await axios.post('http://localhost:3001/stopRecording');
        console.log('Recording stopped, processing audio...');
    } catch (error) {
        console.error('Error stopping recording:', error);
    }
};

// Send a POST request to transcribe audio and chat
const transcribeAndChat = async () => {
    try {
        await axios.post('http://localhost:3001/transcribeAndChat');
        console.log('Transcription and chat initiated');
    } catch (error) {
        console.error('Error initiating transcription and chat:', error);
    }
};

// Function to handle keydown events
const detectKeyDown = (e: KeyboardEvent) => {
    console.log(e.key);
};

export const KeyPressListener = () => {
    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true);
        return () => {
            document.removeEventListener('keydown', detectKeyDown, true);
        };
    }, []);

    return null; // This component doesn't render anything
};



