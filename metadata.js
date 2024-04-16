import { getMetadata, getFileNames } from './fileIO.js';


var unprocessedMetadata = [];
var processedMetadata = [];
var mp3FileNames = [];

getFileNames().then(names => {
    mp3FileNames = names;
})
getMetadata().then(metadata => {
    unprocessedMetadata = metadata;
    console.log(metadata);
});


function cleanMetadata(title, artist) {
    title = title.replace(" - Copy", "").replace(" (HD)", "").replace(" (Official Video)", "").trim();
    if (title.includes(" - ") && !artist) {
        [artist, title] = title.split(" - ", 2);
    }
    title = title.replace(/\(.*\)|\[.*]|{.*}|-.*|ft\..*|feat\..*|official.*|video.*|\d+kbps.*/gi, '').trim();
    if (artist === null) {
        artist = "";
    } else {
        artist = artist.split(',')[0]; // Take the first artist if there are multiple
    }
    artist = artist.replace(/\(.*\)|\[.*]|{.*}|official.*|video.*/gi, '').trim();

    return [title, artist];
}


function processMetadata(data) {
    for (var i = 0; i < data.length; i++) {
        var song = data[i];
        var processedTags = cleanMetadata(song.Title, song.Artist);
        console.log(processedTags);
        var newSongData = {
            Title: processedTags[0],
            Artist: processedTags[1],
            Album: song.Album
        }
        processMetadata.push(newSongData);
    }
}
