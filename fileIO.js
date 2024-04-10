

function dropHandler(input){
    printFileNamees(input);
}

function handleFiles(files){
    printFileNames(files);
}

function printFileNames(inputFolder){
    console.log(typeof inputFolder);
    console.log(inputFolder[0]);
    console.log(typeof inputFolder[0]);


    // for(var i = 0; i < inputFolder.length; i++){
    //     console.log(inputFolder[i].name);
    // }
}