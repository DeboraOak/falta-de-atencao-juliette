<<<<<<< HEAD
// const User = require("../db/model/Usuario");

function loginWithSpotify() {
    fetch('/getSecretData')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const clientId = data.client_id;
            const redirectUri = data.redirect_uri;
            const scope = 'user-read-private user-read-email';
            console.log("Fazendo login no spotify...");
            const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}&response_type=token`;
            window.location.href = authorizeUrl;
        })
        .catch(error => console.error('Error fetching secret data:', error));
}

function handleRedirect() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    if (params.has('access_token')) {
        const accessToken = params.get('access_token');
        getUserInfo(accessToken);
        console.log(accessToken);
    }
}

function getUserInfo(accessToken) {
    fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(response => response.json())
        .then(data => {
            const userInfoElement = document.getElementById('user-info');
            userInfoElement.innerHTML = `<p>Bem Vindo(a), ${data.display_name}!</p>`;
        })
        .catch(error => console.error('Error fetching user info:', error));
=======
function loginWithSpotify() {
    // Fetch the sensitive data from the server
    fetch('/getSecretData')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const clientId = data.client_id;
            const redirectUri = data.redirect_uri;
            const scope = 'user-read-private user-read-email';
            console.log("Fazendo login no spotify...");
            const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}&response_type=token`;
            window.location.href = authorizeUrl;

        })
        .catch(error => console.error('Error fetching secret data:', error));
}

function handleRedirect() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    if (params.has('access_token')) {
        const accessToken = params.get('access_token');
        fetch('/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: accessToken })
        })
        .catch(error => {
            console.error('Erro fetching route', error);
        });
    }
>>>>>>> 9afd9c2b598e4d35123775c0ba1c7ab0b7203efc
}

// Chamado quando a pagina e redirecionada de volta apos o login
handleRedirect();