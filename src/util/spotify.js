const User = require("../db/model/Usuario");

exports.loginWithSpotify = async function () {
    try {
        // Fetch the sensitive data from the server
        const response = await fetch("/getSecretData");
        const data = await response.json();
        
        console.log(data);
        const clientId = data.client_id;
        const redirectUri = data.redirect_uri;
        const scope = "user-read-private user-read-email";
        console.log("Fazendo login no spotify...");
        const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}&response_type=token`;
        window.location.href = authorizeUrl;
    } catch (error) {
        console.error("Error fetching secret data:", error);
    }
}

async function handleRedirect () {
    try {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        if (params.has("access_token")) {
            const accessToken = params.get("access_token");
            
            const userInfo = await getUserInfo(accessToken);
            await User.create({
                display_name: userInfo.display_name,
                email: userInfo.email,
                country: userInfo.country,
                access_token: accessToken
            });
        }
    } catch (error) {
        console.error("Error in redirect handling:", error);
    }
}

async function getUserInfo (accessToken) {
    try {
        const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
}

// Chamado quando a página é redirecionada de volta após o login
await handleRedirect();
