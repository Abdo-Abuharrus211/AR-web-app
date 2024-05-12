import { getMetadata, getFileNames } from './fileIO.js';
// import { response } from 'express';
// import { error } from 'console';


var unprocessedMetadata = [];
var processedMetadata = [];
var mp3FileNames = [];
var addedTitles = [];
var failedTitles = [];

document.addEventListener('metadataUpdated', () => {
   unprocessedMetadata =[];
   unprocessedMetadata = getMetadata();
   console.log(unprocessedMetadata);
    mp3FileNames = [];
    mp3FileNames = getFileNames();
    console.log(mp3FileNames);
});

// function cleanMetadata(title, artist) {
//     title = title.replace(" - Copy", "").replace(" (HD)", "").replace(" (Official Video)", "").trim();
//     if (title.includes(" - ") && !artist) {
//         [artist, title] = title.split(" - ", 2);
//     }
//     title = title.replace(/\(.*\)|\[.*]|{.*}|-.*|ft\..*|feat\..*|official.*|video.*|\d+kbps.*/gi, '').trim();
//     if (artist === null) {
//         artist = "";
//     } else {
//         artist = artist.split(',')[0]; // Take the first artist if there are multiple
//     }
//     artist = artist.replace(/\(.*\)|\[.*]|{.*}|official.*|video.*/gi, '').trim();

//     return [title, artist];
// }


// function processMetadata(data) {
//     for (var i = 0; i < data.length; i++) {
//         var song = data[i];
//         var processedTags = cleanMetadata(song.Title, song.Artist);
//         console.log(processedTags);
//         var newSongData = {
//             Title: processedTags[0],
//             Artist: processedTags[1],
//             Album: song.Album
//         }
//         processedMetadata.push(newSongData);
//     }
// }

// TODO: Send the metadata to the backend
function sendToBackend(data){
    axios.post('https://localhost:5000/receiveMetadata', data).then(response =>{
        console.log("Response:" + response);
    }).catch( error => {
        console.log("Error" + error);
    })
}

function getAddedResults(){
    axios.get('https://localhost:5000/getResults').then(response =>{
        addedTitles = response;
        console.log(addedTitles);
    }).catch(error =>{
        console.log(error);
    })
}

function getFailed(){
    axios.get('https://localhost:5000/getFailed').then(response =>{
        failedTitles = response;
        console.log(failedTitles);
    }).catch(error =>{
        console.log(error);
    })
}

