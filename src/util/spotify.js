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
}

// Chamado quando a pagina e redirecionada de volta apos o login
handleRedirect();