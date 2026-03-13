# AudioReaper Web app
* Author: Abdulqadir Abuharrus
* Date: 03/07/2024

>[!Warning] 
>AudioReaper's systems are currently being undergoing a full overhaul and refactoring
> The client is being rebuilt using Astro to improve the UI/UX and reducing reliance on certain NPM packages where possible. Additionally, the backend is being refactored to increase efficiency.
>
> During this time it will remain **inactive** to end users.

## Description:
AudioReaper is a web app that bridges the gap between music libraries on PC and Spotify accounts.

Giving users the option to syncrhonize and add these tracks to their playlists or create a new one all together.
AudioReaper works by scanning metadata from MP3 files and leveraging Natural Language Processing (NLP) to extract data from file names where tags aren't available and/or reliable enough.

### History
AudioReaper started as a simple Python script that I'd use a few times a month until one day; when my friend suggested sharing it. However, I knew that a script or executable that runs in the terminal wouldn't be useful for average users, and that's where the idea to build a simple microservice centered around AR came to be.

## Requirements
* A modern browser such as Chrome or Firefox
* A PC housing your MP3 or WAV files i,e, your music
* A Spotify account to log into in order to sync your music

>[!Note]
>AudioReaper does not and will never collect nor retain your private information, including but not limited to Spotify credentials. All logins are done via Spotify's official OAuth2 API.

## Instructions
1. Go to [AudioReaper](https://audioreaper.aabuharrus.dev)
2. Click the 'Log in' button
3. Authorize AudioReaper with the appropriate permissions as shown by the Spotify auth window.
4. Upload the folder containing MP3 files, 100 tracks or less at a time for best results, by dragging and dropping or using the 'Browse' button.
5. Type in the name of the playlist, existing or new. 
   Please note that playlist names are **case-sensitive**.
6. Hit the `Harvest` button and let AudioReaper work.
7. The tracks AR fails to add will be listed in the 'Failed Tracks' section.
8. When finished, be sure to log out, but don't worry if you don't as AudioReaper's backend ends sessions, logs out users then deletes session data after a short timeout period.

## Technologies
The app is rather simple and lightweight.
* Built using Express.js ( currently porting to Astro framework)
* For styling, I used [pico](https://picocss.com/), a minimal CSS framework


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
