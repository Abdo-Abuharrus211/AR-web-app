var playlistNameValue = "";
var isFolderAdded = false;
const APIBaseURL = 'http://localhost:5000'; // TODO: replace with real API URL and store in .env

const playlistNameInput = document.getElementById('playlist-input');
playlistNameInput.addEventListener("input", () => {
    playlistNameValue = playlistNameInput.value;
    validateInput();
});

const folderInput = document.getElementById("folderInput").addEventListener("change", handleFolderInput);
const dropInput = document.getElementById('drop-zone').addEventListener("drop", handleFolderInput);
const loginBtn = document.getElementById('login-btn').addEventListener("click", loginUser);
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
    }
    else {
        document.getElementById("harvest-btn").disabled = true;
        console.log("Aborting harvest! Enter playlist name!")
    }
}

// TODO: Implement the commenceHarvest function to kickstart the process by setting off function calls in a specific order
// Account for wait time and async functions and to wait until the backend is done to get results
async function commenceHarvest() {
    sendPlaylistName();
    document.dispatchEvent(new Event('harvestCommence'));
}

function loginUser() {
    axios.get(`${APIBaseURL}/login`).then(response => {
        console.log(response);
        window.location = response.data.auth_url;
        // TODO: Create pop-up to confirm signed in as user X ...blah blah
    }).catch(error => {
        console.log("Error authenticating: " + error);
    })
}

function sendPlaylistName() {
    var playlistName = document.getElementById('playlist-input').value;
    // console.log("Name of the playlist is: " + playlistName);
    axios.post(`${APIBaseURL}/setPlaylistName`, { name: playlistName }).then(response => {
        console.log("Response: " + response.data);
    }).catch(error => {
        console.log("Response: " + error);
    })
}



