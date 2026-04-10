import { APIBaseURL } from "../constants";

function checkLoginStatus() {
    let isLoggedIn = sessionStorage.getItem('loggedIn');
    let name = sessionStorage.getItem('username');
    let label = document.getElementById('login-label');
    if (isLoggedIn && !name) {
        getUsername();
    }
    if (isLoggedIn) {
        document.getElementById("logout-btn")?.removeAttribute("hidden");
        document.getElementById("login-btn")?.setAttribute("hidden", "hidden");
        if (label) label.innerHTML = `Logged in as: <span style="color: var(--accent); font-weight: bold;">${name}</span>`;
    } else {
        document.getElementById("logout-btn")?.setAttribute("hidden", "hidden");
        document.getElementById("login-btn")?.removeAttribute("hidden");
        if (label) label.innerHTML = 'Please log into Spotify.';
    }
}


async function exchangeTokenForData(code: string) {
    try {
        const response = await fetch(`${APIBaseURL}/exchangeCodeSession/${code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        if (response.ok) {
            let res = await response.json()
            sessionStorage.setItem('username', res.username)
            sessionStorage.setItem('userID', res.userID)
            sessionStorage.setItem('loggedIn', 'true')
        } else {
            console.log(`Error authenticating user: ${response.statusText}`)
        }
    } catch (error) {
        console.log(`Error occured authenticating session: ${error}`)
    }
}

async function getUsername() {
    if (!(sessionStorage.getItem('username'))) {
        try {
            const response = await fetch(`${APIBaseURL}/getDisplayName`, {
                method: "GET",
            });

            if (response.ok) {
                let res = await response.json();
                let name = res.data;
                sessionStorage.setItem('username', name);
            }
        } catch (error) {
            console.log(`Error fetching username: ${error}`);
        }
    }
}

export { checkLoginStatus, exchangeTokenForData }; 