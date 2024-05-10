// Here we'll have scripts that modify the DOM

import axios from "axios";
import { error } from "console";

// import { folderAdded, metadata } from './fileIO';
var playlistNameValue = "";
var isFolderAdded = false;

const playlistNameInput = document.getElementsByClassName("playlist-form")[0];
playlistNameInput.addEventListener("input", () => {
    playlistNameValue = playlistNameInput.value;
    console.log(playlistNameValue);
    validateInput();
});


const folderInput = document.getElementById("folderInput").addEventListener("change", handleFolderInput);
const dropInput = document.getElementById('drop-zone').addEventListener("drop", handleFolderInput);

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


// API requests and backend communictation
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode) {
        getAccessToken(authorizationCode);
    } else {
        console.error('No authorization code in redirect URL');
    }
}

function prompUserLogin() {
    const clientID = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectURI = encodeURIComponent('https://localhost:8888');
    const scope = encodeURIComponent('playlist-modify-public playlist-modify-private playlist-read-private');
    window.location.href = `httpss://accounts.spotify.com/authorize?response_type=code&client_id=${clientID}&scope=${scopes}&redirect_uri=${redirectUri}`;
}


function getAccessToken(authorization_code) {
    const clientID = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectURI = 'https://localhost:8888';

    axios({
        method: 'post',
        url: 'httpss://accounts.spotify.com/api/token',
        params: {
            grant_type: 'authorization_code',
            code: authorization_code,
            redirect_uri: redirectURI,
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }).then(response => {
        // The access token and refresh token are in response.data
        console.log(response.data);
    }).catch(error => {
        console.error(error);
    });
}

function sendAccessTokenToBackend(accessToken) {
    axios({
        method: 'post',
        url: 'https://localhost:5000/accessToken', // TODO: replace with real API URL
        data: {
            access_token: accessToken
        }
    }).then(response => {
        console.log(response.data);
    }).catch(error => {
        console.error(error);
    });
}

//TODO: Send the playlist name entered by the user to the backend (separately from the actual data?)
function sendPlaylistName() { 
    var name = document.getElementById('playlist-input-form').value;
    console.log("Name of the playlist is: " + name);
    // API request via Axios
    axios.post('https://localhost:5000/setPlaylistName', name).then(response =>{
        console.log("Response: " + response);
    }).catch(error => {
        console.log("Response: " + error);
    })
}



