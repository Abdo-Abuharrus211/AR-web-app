// Here we'll have scripts that modify the DOM
var playlistNameValue = "";

const playlistNameInput = document.getElementsByClassName("playlist-form")[0];
playlistNameInput.addEventListener("input", () => {
    playlistNameValue = playlistNameInput.value;
}
);

function validateInput() {
    // TODO: Check that both a folder (metadata) has been dropped
    //  and that playlistNameValue is not empty string
    // Then set the Harvest btn to valid
}
