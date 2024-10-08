import { getMetadata, getFileNames } from './fileIO.js';

axios.defaults.withCredentials = true;


var unprocessedMetadata = [];
const APIBaseURL = 'http://localhost:5000'; // TODO: replace with real API URL and store in .env
// const APIBaseURL = 'https://project-audio-reaper-pure-4.onrender.com';
var mp3FileNames = [];

document.addEventListener('metadataUpdated', () => {
   unprocessedMetadata =[];
   unprocessedMetadata = getMetadata();
    mp3FileNames = [];
    mp3FileNames = getFileNames();
});

document.addEventListener('harvestCommence', () => {
    try{
        sendToBackend(unprocessedMetadata);
    }
    catch(error){
        console.log(error);
    }
});

function sendToBackend(data){
    document.getElementById('failedTracks-list').innerHTML = '';
    document.getElementById('loadingIndicator').classList.remove('hidden');
    let userID = sessionStorage.getItem('userID');
    axios.post(`${APIBaseURL}/receiveMetadata`, data).then(response =>{
        document.getElementById('loadingIndicator').classList.add('hidden');
        getFailed();
        document.getElementById('failBox').classList.remove('hidden');
        document.getElementById('successIndicator').classList.remove('hidden');
        setTimeout(() =>{
            document.getElementById('successIndicator').classList.add('hidden');
        }), 5000;
    }).catch( error => {
        console.log("Error" + error);
        document.getElementById('loadingIndicator').classList.add('hidden');
    });
}

// function getAddedResults(){
//     axios.get(`${APIBaseURL}/getResults`).then(response =>{
//         addedTitles = response;
//     }).catch(error =>{
//         console.log(error);
//     })
// }

function getFailed() {
    let userID = sessionStorage.getItem('userID');
    axios.get(`${APIBaseURL}/getFailed`).then(response => {
        var failedSongs = response.data;
        const failedTrackItems = failedSongs.map(title => `<li>${title}</li>`).join('');
        document.getElementById('failedTracks-list').innerHTML = failedTrackItems;
    }).catch(error => {
        console.log(error);
    })
}

