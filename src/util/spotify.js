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

            // Chamado quando a pagina e redirecionada de volta apos o login
            handleRedirect();
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
}

function toggleFullscreen() {
    var iframe = document.getElementsByClassName('game-iframe')[0];
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { /* Firefox */
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { /* IE/Edge */
        iframe.msRequestFullscreen();
    }

    // Altera a orientação do dispositivo ao entrar em fullscreen no celular
    setOrientation('landscape');
}

function setOrientation(orientation){
    if (screen.orientation) {
        screen.orientation.lock(orientation).catch(error => {
            console.error('Error locking orientation:', error);
        });
    }
}

function logoutSpotify() {
    window.location.href = '/src/view/login.html';
}
