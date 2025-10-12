import { getFolderName } from './fileIO'
import { checkLoginStatus, exchangeTokenForData } from './user'
import { APIBaseURL } from '../constants'

var playlistNameValue = ''
var isFolderAdded = false

const playlistNameInput = document.getElementById(
    'playlist-input'
) as HTMLInputElement
playlistNameInput.addEventListener('input', () => {
    playlistNameValue = playlistNameInput.value
    validateInput()
})

document
    .getElementById('folderInput')
    .addEventListener('change', handleFolderInput)
document.getElementById('drop-zone').addEventListener('drop', handleFolderInput)
document
    .getElementById('harvest-btn')
    .addEventListener('click', commenceHarvest)

// DOM Manipilation //
function validateInput() {
    var loggedInStatus = sessionStorage.getItem('loggedIn') === 'true'
    if (isFolderAdded == true && playlistNameValue != '' && loggedInStatus) {
        document.getElementById('harvest-btn').disabled = false
    } else {
        document.getElementById('harvest-btn').disabled = true
    }
}

// TODO:  why have this???
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search)
    let tokenCode = urlParams.get('code')
    if (tokenCode) {
        exchangeTokenForData(tokenCode).then(() => {
            checkLoginStatus()
        })
    } else {
        checkLoginStatus()
    }
}

function handleFolderInput(e) {
    e.preventDefault()
    var items
    if (e.type === 'change') {
        items = e.target.files
        for (let i = 0; i < items.length; i++) {
            if (items[i].name.endsWith('.mp3') || items[i].type === 'audio/mpeg') {
                isFolderAdded = true
            }
        }
        validateInput()
    } else if (e.type === 'drop') {
        items = e.dataTransfer.items
        for (let i = 0; i < items.length; i++) {
            const item = items[i].webkitGetAsEntry()
            if (item) {
                traverseFileTree(item)
            }
        }
    }
}

function traverseFileTree(item, path = '') {
    if (item.isFile) {
        // Get file
        item.file(file => {
            if (file.name.endsWith('.mp3') || file.type === 'audio/mpeg') {
                isFolderAdded = true
            }
            validateInput()
        })
    } else if (item.isDirectory) {
        // Get folder contents
        const dirReader = item.createReader()
        dirReader.readEntries(entries => {
            for (let i = 0; i < entries.length; i++) {
                traverseFileTree(entries[i], path + item.name + '/')
            }
        })
    }
}

// Core Fnuctionality //
async function commenceHarvest() {
    sendPlaylistName()
    document.dispatchEvent(new Event('harvestCommence'))
    var folderName = getFolderName()
    var successMessage = document.getElementById('success-message')
    successMessage.textContent =
        'Tracks from ' + folderName + ' added to playlist!'
    successMessage.classList.remove('hidden')
}

async function sendPlaylistName() {
    let userID = sessionStorage.getItem('userID')
    var playlistName = document.getElementById('playlist-input').value
    try {
        const response = await fetch(
            `${APIBaseURL}/setPlaylistName/${playlistName}`,
            {
                method: 'POST',
                credentials: 'include'
            }
        )
        if (!response.ok) {
            console.log(`${response.statusText}`)
        }
    } catch (error) {
        console.log(`Error sending playlist name: ${error}`)
    }
}
