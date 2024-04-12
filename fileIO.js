

function dropHandler(event){
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

function dragOverHandler(event){
    event.preventDefault(); // TODO: Add a visual cue to show that the file can be dropped!!!
}

function handleFiles(files){
    for(var i = 0; i < files.length; i++){
        readMusicTags(files[i]);
    }
}

function printFileNames(inputFolder){
    console.log(typeof inputFolder);
    console.log(inputFolder[0]);
    console.log(typeof inputFolder[0]);

}

//TODO: Now that you can access the metadata, organize it into a suitable datastructure
function readMusicTags(file){
    jsmediatags.read(file, {
        onSuccess: function(tag){
            console.log('Title:' + tag.tags.title);
            console.log('Artist:' + tag.tags.artist);
            console.log('Album:' + tag.tags.album);
        },
        onError: function(error){
            console.log(error);
        }
    });
}