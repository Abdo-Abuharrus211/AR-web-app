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


const folderInput = document.getElementById("folderInput");
folderInput.addEventListener("change", handleFolderInput);
folderInput.addEventListener("drop", handleFolderInput);
function handleFolderInput(e) {
    if (Array.from(e.target.files).some(file => file.type === "audio/mpeg")){
        isFolderAdded = true;
    }
    console.log(isFolderAdded);
    validateInput();
}

function validateInput() {
    if(isFolderAdded == true && playlistNameValue != ""){
        document.getElementById("harvest-btn").disabled = false;
        console.log("ready to harvest");
        }
        else {
            document.getElementById("harvest-btn").disabled = true;
            console.log("Aborting harvest! Enter playlist name!")
        }
}
