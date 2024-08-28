This will serve as the web app and front-end for Project AudioReaper
---

#### TODO: 

- [X] Organize the data into a DS that's usable
- [X] Add playlist name form
- [X] Add "Harvest" button
- [X] Make form and button dynamic and restricted until ready
- [X] Modify HTML to reflect drag over
- [X] Change HTML appearance when file dropped in by changing the drop zone accordingly
- [X] Reflect HTML when wrong folders are added.
- [X] Create a custom event to ensure updating the metadata in fileIO.js
- [X] Store the Spotify credentials and pass to backend
- [X] Set up the backend and pass on relevant information
- [X] When logged in change what the btn says
- [X] Add SPotify icon to the login btn
- [X] Adjust btn and text
- [X] Add login btn logic and test
- [X] Account for remaining interactivity and DOM updating
- [X] Send backend the packaged data via API handler (like Axios or AJAx)
- [X] Test frontend, send req to backend
- [X] Finish UI design and make good looking styles
- [X] Store the username in the localstorage session.
- [X] Adjust the API requests URLs to include the 'username' path variable.
- [ ] Adjust for backend's access token
- [ ] Upon logout, clear localstorage/session
- [ ] Conduct final clean-up and removal of comments and To-Dos
- [ ] 
=======

# AudioReaper Web app (frontend)
* Author: Abdulqadir Abuharrus
* Date: 03/07/2024

## Description:
A web app made to help bridge the gap between your local music libraries on your PC and your Spotify playlists!
This is the client side of the web app that was developed to publish and share AudioReaper and allow users to use it cleanly and directly in their browsers.


## Requirements
* A modern browser.
* Directory containing MP3 or WAV files (your music!).
* A Spotify account to sync to.

## Instructions
1. Click the 'Log in' button
2. Authorize AudioReaper with the appropriate permissions as shown by the Spotify auth window.
3. Upload the folder containing MP3 files, 100 tracks or less at a time for best results, by dragging and dropping or using the 'Browse' button.
4. Type in the name of the playlist, existing or new. 
   Please note that playlist names are case-sensitive.
5. Hit the 'Harvest' button and let AudioReaper work.
6. The tracks AR fails to add will be listed in the 'Failed Tracks' section.
7. When finished, be sure to log out, but don't worry if you don't as AudioReaper's backend ends sessions, logs out users then deletes session data.

## Technologies
The frontend is rather simple and lightweight.
* Written in JavaScript, and built using Node.js and Express.
* API calls are handled using Axios for simplicity.
* For styling, I used the minimal CSS framework [pico](https://picocss.com/.

## MIT License

Copyright (c) 2024 ABDULQADIR ABUHARRUS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

- Attribution must be given to the original source, credited to "ABDULQADIR ABUHARRUS/AudioReaper". 
- The name and trademarks of the Software, including but not limited to "AudioReaper", may not be used to endorse or promote products derived from this Software without specific prior written permission.
- The core functionality and architecture of the Software, as well as any derivatives thereof, may not be distributed or sold without specific prior written permission from ABDULQADIR ABUHARRUS.
  
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
