var metadata = [];

function dropHandler(event) {
    event.preventDefault();
    metadata = [];
    var items = event.dataTransfer.items;
    if (items) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].kind === 'file') {
                var entry = items[i].webkitGetAsEntry();

                if (entry) {
                    if (entry.isDirectory) {
                        // Handle directory entry here
                        readDirectory(entry);
                    } else if (entry.isFile) {
                        entry.file(readMusicTags);
                    }
                }
            }
        }
    }
    console.log(metadata);
}

function readDirectory(entry) {
    var dirReader = entry.createReader();
    dirReader.readEntries(function (entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isFile) {
                entries[i].file(readMusicTags);
            } else if (entries[i].isDirectory) {
                readDirectory(entries[i]); // Recursively read nested directories
            }
        }
    });
}

function dragOverHandler(event) {
    event.preventDefault(); // TODO: Add a visual cue to show that the file can be dropped!!!
}

function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
        readMusicTags(files[i]);
    }
    console.log(metadata);
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