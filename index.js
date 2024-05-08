// Here we'll have scripts that modify the DOM
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

// TODO: Get the user to login and then send the auth code to the backend (How?)
function prompt_user_login(){}

//TODO: Send the playlist name entered by the user to the backend (separately from the actual data?)
function sendPlaylistName(){}


