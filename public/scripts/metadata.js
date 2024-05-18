import { getMetadata, getFileNames } from './fileIO.js';


var unprocessedMetadata = [];
const APIBaseURL = 'http://localhost:5000'; // TODO: replace with real API URL and store in .env
var mp3FileNames = [];
var addedTitles = [];
var failedTitles = [];

document.addEventListener('metadataUpdated', () => {
   unprocessedMetadata =[];
   unprocessedMetadata = getMetadata();
   console.log(unprocessedMetadata);
    mp3FileNames = [];
    mp3FileNames = getFileNames();
});

document.addEventListener('harvestCommence', () => {
    try{
        sendToBackend(unprocessedMetadata);
        getAddedResults();
        getFailed();
    }
    catch(error){
        console.log(error);
    }
});

function sendToBackend(data){
    axios.post(`${APIBaseURL}/receiveMetadata`, data).then(response =>{
        console.log("Response:" + response);
    }).catch( error => {
        console.log("Error" + error);
    })
}

function getAddedResults(){
    axios.get(`${APIBaseURL}/getResults`).then(response =>{
        addedTitles = response;
        console.log("Added: \n" + addedTitles);
    }).catch(error =>{
        console.log(error);
    })
}

function getFailed(){
    axios.get(`${APIBaseURL}/getFailed`).then(response =>{
        failedTitles = response;
        console.log("Failed: \n" + failedTitles);
    }).catch(error =>{
        console.log(error);
    })
}

