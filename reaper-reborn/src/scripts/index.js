import { getFolderName } from './fileIO.js';

var playlistNameValue = "";
var isFolderAdded = false;
const APIBaseURL = 'http://localhost:5000';
// const APIBaseURL = process.env.API_BASE_URL;

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

// DOM Manipilation //
function validateInput() {
    var loggedStatus = sessionStorage.getItem('loggedIn') === "true";
    if (isFolderAdded == true && playlistNameValue != "" && loggedStatus == true) {
        document.getElementById("harvest-btn").disabled = false;
    }
    else {
        document.getElementById("harvest-btn").disabled = true;
    }
}

async function exchangeTokenForData(code) {
    try {
        const response = await fetch(`${APIBaseURL}/exchangeCodeSession/${code}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
        });

        if (response.ok) {
            let res = await response.json();
            sessionStorage.setItem('username', res.username);
            sessionStorage.setItem('userID', res.userID);
            sessionStorage.setItem('loggedIn', true);
        } else {
            console.log(`Error authenticating user: ${response.statusText}`);
        }
    } catch (error) {
        console.log(`Error occured authenticating session: ${error}`);
    }
}

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    let tokenCode = urlParams.get('code');
    if (tokenCode) {
        exchangeTokenForData(tokenCode).then(() => {
            checkLoginStatus();
        });
    } else {
        checkLoginStatus();
    }
}


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

// Core Fnuctionality //
async function commenceHarvest() {
    sendPlaylistName();
    document.dispatchEvent(new Event('harvestCommence'));
    var folderName = getFolderName();
    var successMessage = document.getElementById("success-message");
    successMessage.textContent = "Tracks from " + folderName + " added to playlist!"
    successMessage.classList.remove('hidden');
}

async function loginUser() {
    try {
        const response = await fetch(`${APIBaseURL}/login`, {
            method: "GET",
        });

        if (response.ok) {
            let res = await response.json();
            window.location = res.auth_url;
        }
    } catch (error) {
        console.log(`Error authenticating: ${error}`);
    };
}

async function logoutUser() {
    try {
        const response = await fetch(`${APIBaseURL}/logout`, {
            method: "POST",
            credentials: "include"
        });
        if (response.ok) {
            sessionStorage.clear();
            window.location = ('/');
            checkLoginStatus();
        };
    } catch (error) {
        console.log(`Error logging out: ${error}`);
    }
}


async function sendPlaylistName() {
    let userID = sessionStorage.getItem('userID');
    var playlistName = document.getElementById('playlist-input').value;
    try {
        const response = await fetch(`${APIBaseURL}/setPlaylistName/${playlistName}`, {
            method: "POST",
            credentials: 'include',
        });
        if (!response.ok) {
            console.log(`${response.statusText}`);
        }
    } catch (error) {
        console.log(`Error sending playlist name: ${error}`);
    }
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

async function getUsername() {
    if (!(sessionStorage.getItem('username'))) {
        try {
            const response = await fetch(`${APIBaseURL}/getDisplayName`, {
                method: "GET",
            });

            if (response.ok) {
                let res = await response.json();
                let name = res.data;
                sessionStorage.setItem('username', name);
            }
        } catch (error) {
            console.log(`Error fetching username: ${error}`);
        }
    }
}

