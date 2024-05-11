// Here we'll have scripts that modify the DOM

import axios from "axios";
import { error } from "console";

// import { folderAdded, metadata } from './fileIO';
var playlistNameValue = "";
var isFolderAdded = false;
const API_BASE_URL = 'https://localhost:5000'; // TODO: replace with real API URL and store in .env


const playlistNameInput = document.getElementsByClassName("playlist-form")[0];
playlistNameInput.addEventListener("input", () => {
    playlistNameValue = playlistNameInput.value;
    console.log(playlistNameValue);
    validateInput();
});


const folderInput = document.getElementById("folderInput").addEventListener("change", handleFolderInput);
const dropInput = document.getElementById('drop-zone').addEventListener("drop", handleFolderInput);
const harvestBtn = document.getElementById('harvest-btn').addEventListener("click", commenceHarvest);

function handleFolderInput(e) {
    e.preventDefault();
    var items;
    if (e.type === "change") {
        items = e.target.files;
        for (let i = 0; i < items.length; i++) {
            if (items[i].name.endsWith(".mp3") || items[i].type === "audio/mpeg") {
                isFolderAdded = true;
            }
        }
        validateInput();
    } else if (e.type === "drop") {
        items = e.dataTransfer.items;
        for (let i = 0; i < items.length; i++) {
            const item = items[i].webkitGetAsEntry();
            if (item) {
                traverseFileTree(item);
            }
        }
    }
}

function traverseFileTree(item, path = "") {
    if (item.isFile) {
        // Get file
        item.file((file) => {
            if (file.name.endsWith(".mp3") || file.type === "audio/mpeg") {
                isFolderAdded = true;
            }
            validateInput();
        });
    } else if (item.isDirectory) {
        // Get folder contents
        const dirReader = item.createReader();
        dirReader.readEntries((entries) => {
            for (let i = 0; i < entries.length; i++) {
                traverseFileTree(entries[i], path + item.name + "/");
            }
        });
    }
}
function validateInput() {
    if (isFolderAdded == true && playlistNameValue != "") {
        document.getElementById("harvest-btn").disabled = false;
        // console.log("ready to harvest");
    }
    else {
        document.getElementById("harvest-btn").disabled = true;
        console.log("Aborting harvest! Enter playlist name!")
    }
}

// TODO: Implement the commenceHarvest function to kickstart the process
function commenceHarvest() { }

// API requests and backend communictation
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode) {
        // Send the authorization code to the backend
        sendAuthorizationCodeToBackend(authorizationCode);
    } else {
        console.error('No authorization code in redirect URL');
    }
}

function promptUserLogin() {
    const clientID = process.env.SPOTIFY_CLIENT_ID;
    const redirectURI = encodeURIComponent('https://localhost:8888');
    const scopes = encodeURIComponent('playlist-modify-public playlist-modify-private playlist-read-private');
    window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientID}&scope=${scopes}&redirect_uri=${redirectURI}`;
}

function sendAuthorizationCodeToBackend(authorization_code) {
    axios({
        method: 'post',
        url: 'https://localhost:5000/authCode', // TODO: replace with real API URL
        data: {
            code: authorization_code
        }
    }).then(response => {
        console.log(response.data);
    }).catch(error => {
        console.error(error);
    });
}


//TODO: Send the playlist name entered by the user to the backend (separately from the actual data?)
function sendPlaylistName() {
    var playlistName = document.getElementById('playlist-input-form').value;
    console.log("Name of the playlist is: " + playlistName);
    // API request via Axios
    axios.post('https://localhost:5000/setPlaylistName', { name: playlistName }).then(response => {
        console.log("Response: " + response.data);
    }).catch(error => {
        console.log("Response: " + error);
    })
}



