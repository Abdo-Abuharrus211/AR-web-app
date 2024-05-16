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
    // console.log(mp3FileNames);
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
})

function sendToBackend(data){
    axios.post('APIBaseURL/receiveMetadata', data).then(response =>{
        console.log("Response:" + response);
    }).catch( error => {
        console.log("Error" + error);
    })
}

function getAddedResults(){
    axios.get('APIBaseURL/getResults').then(response =>{
        addedTitles = response;
        console.log("Added: \n" + addedTitles);
    }).catch(error =>{
        console.log(error);
    })
}

function getFailed(){
    axios.get('APIBaseURL/getFailed').then(response =>{
        failedTitles = response;
        console.log("Failed: \n" + failedTitles);
    }).catch(error =>{
        console.log(error);
    })
}

