var metadata = [];

function dropHandler(event) {
    event.preventDefault(); // This needs to be event.preventDefault(), not input.preventDefault()
    var items = event.dataTransfer.items;
    if (items) {
        // Use DataTransferItemList interface to access the files
        for (var i = 0; i < items.length; i++) {
            // If dropped items aren't files, reject them
            if (items[i].kind === 'file') {
                var file = items[i].getAsFile();
                readMusicTags(file);
            }
        }
    }
}

function dragOverHandler(event) {
    event.preventDefault(); // TODO: Add a visual cue to show that the file can be dropped!!!
}

function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
        readMusicTags(files[i]);
    }
}

function printFileNames(inputFolder) {
    // console.log(typeof inputFolder);
    // console.log(inputFolder[0]);
    // console.log(typeof inputFolder[0]);
}



function readMusicTags(file) {
    if (!file.name.toLowerCase().endsWith('.mp3')) {
        console.log('Not an MP3 file:', file.name);
        return;
    };
    jsmediatags.read(file, {
        onSuccess: function (tag) {
            var songData = {                
                Title: tag.tags.title || 'Unknown Title',
                Artist: tag.tags.artist || 'Unknown Artist',
                Album: tag.tags.album || 'Unknown Album',
                // console.log('Artist:', tag.tags.artist);
                // console.log('Album:', tag.tags.album);
            };
            metadata.push(songData);
        },
        onError: function (error) {
            console.log('Error reading metadata from:', file.name);
            console.log(error);
        }
    });
}

console.log(metadata);