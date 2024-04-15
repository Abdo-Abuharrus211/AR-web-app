import { getMetadata } from './fileIO.js';

//TODO: creata a function to clean the metadata


getMetadata().then(metadata => {
    console.log(metadata);
});