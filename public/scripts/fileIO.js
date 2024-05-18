var metadataArray = [];
var fileNames = [];
var folderCheck = false;
var filesToRead = 0;
var filesRead = 0;
var mp3FilesToRead = 0;
var metadataPromise;

//Event listeners
document.getElementById('drop-zone').addEventListener('drop', dropHandler);
document.getElementById('drop-zone').addEventListener('dragover', dragOverHandler);
document.getElementById('folderInput').addEventListener('change', function (event) {
    handleFiles(event.target.files);
});


function resetMetadataPromise() {
    metadataPromise = new Promise((resolve, reject) => {
        var checkInterval = setInterval(() => {
            if (filesToRead === filesRead && mp3FilesToRead === 0) {  // Ensures all MP3 files are processed
                clearInterval(checkInterval);
                console.log("Resolving promise with metadataArray:", metadataArray);
                resolve(metadataArray);
            }
        }, 100);
    });
}


// Call resetMetadataPromise to create the initial Promise
resetMetadataPromise();

function dropHandler(event) {
    event.preventDefault();
    resetMetadataPromise();
    metadataArray = [];
    fileNames = [];
    var items = event.dataTransfer.items;
    filesToRead = items.length;
    var promises = [];
    if (items) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].kind === 'file') {
                var entry = items[i].webkitGetAsEntry();

                if (entry) {
                    if (entry.isDirectory) {
                        // Handle directory entry
                        readDirectory(entry);
                    } else if (entry.isFile) {
                        promises.push(new Promise((resolve, reject) => {
                            entry.file(file => {
                                readMusicTags(file).then(resolve);
                            });
                        }));
                    }
                }
            }
        }
    }
    Promise.all(promises).then(() => {
        folderCheck = true;
        checkMp3FilesRead();
    });
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
    metadataArray = [];
    fileNames = [];
    for (var i = 0; i < files.length; i++) {
        readMusicTags(files[i]);
    }
    folderCheck = true;
    checkMp3FilesRead();
}


function readMusicTags(file) {
    return new Promise((resolve, reject) => {
        if (!file.name.toLowerCase().endsWith('.mp3')) {
            indicateWrongFileTypes();
            filesRead++;
            resolve();
            return;
        };
        fileNames.push(file.name);
        jsmediatags.read(file, {
            onSuccess: function (tag) {
                var songData = {
                    Title: tag.tags.title || '',
                    Artist: tag.tags.artist || '',
                    Album: tag.tags.album || '',
                    FileName: file.name
                };
                metadataArray.push(songData);
                indicateFolderAdded();
                filesRead++;
                resolve();
            },
            onError: function (error) {
                console.error('Error reading metadata from:', file.name, error);
                filesRead++;
                resolve();
            }
        });
    });
}

function checkMp3FilesRead() {
    if (mp3FilesToRead === 0 && folderCheck) {
        document.dispatchEvent(new Event('metadataUpdated'));
    }
}

function indicateFolderAdded() {
    var drop = document.getElementById('drop-zone');
    drop.classList.replace('folder-not-added', 'folder-added');
    drop.classList.replace('wrong-file-types', 'folder-added');
    //TODO: pop-up stating a folder with MP3s added + name of folder
}

function indicateWrongFileTypes() {
    var drop = document.getElementById('drop-zone');
    drop.classList.replace('folder-not-added', 'wrong-file-types');
    //TODO: pop-up stating a folder with wrong file types and to add a folder with MP3s

}


export function getMetadata() {
    return metadataArray;
}

export function getFileNames() {
    return fileNames;
}