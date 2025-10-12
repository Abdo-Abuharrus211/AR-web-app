import { fail } from 'assert';
import { getMetadata, getFileNames } from './fileIO.js';

var unprocessedMetadata = [];
const APIBaseURL = 'http://localhost:5000'; // replace with real API URL and store in .env
// const APIBaseURL = process.env.API_BASE_URL;
var mp3FileNames = [];

document.addEventListener('metadataUpdated', () => {
    unprocessedMetadata = [];
    unprocessedMetadata = getMetadata();
    mp3FileNames = [];
    mp3FileNames = getFileNames();
});

document.addEventListener('harvestCommence', () => {
    try {
        sendToBackend(unprocessedMetadata);
    }
    catch (error) {
        console.log(error);
    }
});

async function sendToBackend(data) {
    document.getElementById('failedTracks-list').innerHTML = '';
    document.getElementById('loadingIndicator').classList.remove('hidden');
    let userID = sessionStorage.getItem('userID');

    try {
        const response = await fetch(`${APIBaseURL}/receiveMetadata`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        document.getElementById('loadingIndicator').classList.add('hidden');
        if (response.ok) {
            getFailed();
            document.getElementById('failBox').classList.remove('hidden');
            document.getElementById('successIndicator').classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('successIndicator').classList.add('hidden');
            }, 5000);
        } else {
            console.log("Error: " + response.statusText);
        }
    } catch (error) {
        console.log("Error: " + error);
        document.getElementById('loadingIndicator').classList.add('hidden');
    }
}

async function getAddedResults() {
    try {
        const response = await fetch(`${APIBaseURL}/getResults`, {
            method: "GET",
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.log(`Error fetching results: ${response.statusText}`)
        }
    } catch (error) {
        console.log(error);
    }
}

async function getFailed() {
    let userID = sessionStorage.getItem('userID');
    try {
        const response = await fetch(`${APIBaseURL}/getFailed`, {
            method: "GET",
        });
        if (response.ok) {
            let failedSongs = await response.json();
            const failedTrackItems = failedSongs.map(title => `<li>${title}</li>`).join('');
            const failListElm = document.getElementById('failedTracks-list');
            if (failListElm) {
                failListElm.innerHTML = failedTrackItems;
            }
        } else {
            console.log(`Error fetching failed tracks: ${response.statusText}`)
        }
    } catch (error) {
        console.log(error);
    }
}

