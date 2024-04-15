var metadataArray = [];
var folderCheck = false;
var filesToRead = 0;
var filesRead = 0;
var metadataPromise;

//Event listeners
document.getElementById('drop-zone').addEventListener('drop', dropHandler);
document.getElementById('drop-zone').addEventListener('dragover', dragOverHandler);
document.getElementById('folderInput').addEventListener('change', function(event) {
    handleFiles(event.target.files);
});


function resetMetadataPromise() {
    metadataPromise = new Promise((resolve, reject) => {
        var checkInterval = setInterval(() => {
            if (filesToRead === filesRead) {
                clearInterval(checkInterval);
                resolve(metadataArray);
            }
        }, 100);
    });
}

// Call resetMetadataPromise to create the initial Promise
resetMetadataPromise();

function dropHandler(event) {
    event.preventDefault();
    filesToRead = items.length;
    resetMetadataPromise();
    metadataArray = [];
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
    folderCheck = true;
    console.log(metadataArray);
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
    filesToRead = files.length;
    resetMetadataPromise();
    for (var i = 0; i < files.length; i++) {
        readMusicTags(files[i]);
    }
    console.log(metadataArray);
    folderCheck = true;
}

function readMusicTags(file) {
    if (!file.name.toLowerCase().endsWith('.mp3')) {
        console.log('Not an MP3 file:', file.name);
        indicateWrongFileTypes();
        filesRead++;
        return;
    };
    jsmediatags.read(file, {
        onSuccess: function (tag) {
            var songData = {
                Title: tag.tags.title || '',
                Artist: tag.tags.artist || '',
                Album: tag.tags.album || ''
            };
            metadataArray.push(songData);
            indicateFolderAdded();
        },
        onError: function (error) {
            console.log('Error reading metadata from:', file.name);
            console.log(error);
        }
    });
    filesRead++;
}

function indicateFolderAdded(){
    var drop = document.getElementById('drop-zone');
    drop.classList.replace('folder-not-added', 'folder-added');
    drop.classList.replace('wrong-file-types', 'folder-added');
    //TODO: pop-up stating a folder with MP3s added + name of folder
}

function indicateWrongFileTypes(){
    var drop = document.getElementById('drop-zone');
    drop.classList.replace('folder-not-added', 'wrong-file-types');
    //TODO: pop-up stating a folder with wrong file types and to add a folder with MP3s

}


export function getMetadata(){
    return metadataPromise;
}
