
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
