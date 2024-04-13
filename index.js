// Here we'll have scripts that modify the DOM
// import { folderAdded, metadata } from './fileIO';
var playlistNameValue = "";
var folderAdded = false;

const playlistNameInput = document.getElementsByClassName("playlist-form")[0];
playlistNameInput.addEventListener("input", () => {
    playlistNameValue = playlistNameInput.value;
    validateInput();
}
);


const folderInput = document.getElementById("folderInput");
folderInput.addEventListener("change", (e) => {
    folderAdded = Array.from(e.target.files).every(file => file.type === "audio/mpeg");
    validateInput();
});

function validateInput() {
    // TODO: constantly check that both a folder (metadata) has been dropped or added
    //  and that playlistNameValue is not empty string
    // Then set the Harvest btn to valid
    if(folderAdded == true && playlistNameValue != ""){
        document.getElementById("harvest-btn").disabled = false;
        console.log("ready to harvest");
        }
        else {
            document.getElementById("harvest-btn").disabled = true;
            console.log("Aborting harvest! Enter playlist name!")
        }
}
