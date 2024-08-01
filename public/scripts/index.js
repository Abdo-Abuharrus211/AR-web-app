import { getFolderName } from './fileIO.js';

var playlistNameValue = "";
var isFolderAdded = false;
const APIBaseURL = 'http://localhost:5000';
// const APIBaseURL = 'https://project-audio-reaper-pure-4.onrender.com';

const playlistNameInput = document.getElementById('playlist-input');
playlistNameInput.addEventListener("input", () => {
    playlistNameValue = playlistNameInput.value;
    validateInput();
});

const folderInput = document.getElementById("folderInput").addEventListener("change", handleFolderInput);
const dropInput = document.getElementById('drop-zone').addEventListener("drop", handleFolderInput);
const loginBtn = document.getElementById('login-btn').addEventListener("click", loginUser);
const logoutBtn = document.getElementById('logout-btn').addEventListener("click", logoutUser);
const harvestBtn = document.getElementById('harvest-btn').addEventListener("click", commenceHarvest);

const disclaimerToggle = document.getElementById('disclaimerToggle').addEventListener('click', () => {
    var disclaimerText = document.getElementById('disclaimerText');
    if (disclaimerText.classList.contains('hidden')) {
        disclaimerText.classList.remove('hidden');
        setTimeout(() => {
            disclaimerText.classList.add('hidden');
        }, 7000);
    } else {
        disclaimerText.classList.add('hidden');
    }
});

// DOM Manipilation//////////
function validateInput() {
    var loggedStatus = sessionStorage.getItem('loggedIn') === "true";
    console.log(`user status is ${loggedStatus}`);
    if (isFolderAdded == true && playlistNameValue != "" && loggedStatus == true) {
        document.getElementById("harvest-btn").disabled = false;
    }
    else {
        document.getElementById("harvest-btn").disabled = true;
    }
}

window.onload = function () {
    let displayName = sessionStorage.getItem('username');
    if (!displayName) {
        const urlParams = new URLSearchParams(window.location.search);
        displayName = urlParams.get('displayName');
        if (displayName) {
            sessionStorage.setItem('username', displayName);
            urlParams.delete('displayName');
            history.replaceState({}, '', `${location.pathname}?${urlParams}`);
        }
    }
    if (displayName) {
        document.getElementById('login-label').innerHTML = `Logged in as: <span style="color: var(--accent); font-weight: bold;">${displayName}</span>`;
    }
    checkLoginStatus();
}

//TODO: Move these to fileIO.js ????
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

// Core Fnuctionality////////
async function commenceHarvest() {
    sendPlaylistName();
    document.dispatchEvent(new Event('harvestCommence'));
    var folderName = getFolderName();
    var successMessage = document.getElementById("success-message");
    successMessage.textContent = "Tracks from " + folderName + " added to playlist!"
    successMessage.classList.remove('hidden');
}
function loginUser() {
    axios.get(`${APIBaseURL}/login`).then(response => {
        window.location = response.data.auth_url;
        sessionStorage.setItem('loggedIn', true);
        // TODO: Store username in sessionStorage
        getUsername();
    }).catch(error => {
        console.log("Error authenticating: " + error);
    });
}

function logoutUser() {
    let username = sessionStorage.getItem('username');
    axios.post(`${APIBaseURL}/${username}/logout`).then(response => {
        sessionStorage.clear();
        window.location = ('/');
        console.log(response.data.message);
        checkLoginStatus();
    }).catch(error => {
        console.log("Error loggin out: " + error);
    });
}


function sendPlaylistName() {
    let username = sessionStorage.getItem('username');
    var playlistName = document.getElementById('playlist-input').value;
    axios.post(`${APIBaseURL}/${username}/setPlaylistName/${playlistName}`).then(response => {
        console.log("Server Response: " + response.data.message);
    }).catch(error => {
        console.log("Server Response: " + error);
    })
}

function checkLoginStatus() {
    let isLoggedIn = sessionStorage.getItem('loggedIn');
    let name = sessionStorage.getItem('username');
    if (isLoggedIn && !name) {
        getUsername();
    }
    if (isLoggedIn) {
        document.getElementById("logout-btn").removeAttribute("hidden");
        document.getElementById("login-btn").setAttribute("hidden", "hidden");
        document.getElementById('login-label').innerHTML = `Logged in as: <span style="color: var(--accent); font-weight: bold;">${name}</span>`;
    } else {
        document.getElementById("logout-btn").setAttribute("hidden", "hidden");
        document.getElementById("login-btn").removeAttribute("hidden");
        document.getElementById('login-label').innerHTML = 'Please log into Spotify.';
    }
}

function getUsername() {
    if (!(sessionStorage.getItem('username'))) {
        axios.get(`${APIBaseURL}/getDisplayName`).then(response => {
            let name = response.data;
            sessionStorage.setItem('username', name);
        }).catch(error => {
            console.log("Error getting username" + error);
        });
    }
}

