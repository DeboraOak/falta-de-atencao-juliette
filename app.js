global.dotenv = require("dotenv").config();
accessToken = null;
const express = require("express");
const cors = require("cors");
const User = require("./src/db/model/User");
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static("src"));

(async () => {
    try {
        await User.sync();
        console.log("Database initialized!");
    } catch (error) {
        console.error("Erro ao sincronizar o modelo:", error);
    }
})();

app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/src/view/login.html");
});

app.get("/callback", (req, res) => {
    res.sendFile(__dirname + "/src/view/main.html");
});

// Rota para adicionar usuario no banco
app.post("/user", async (req, res) => {
    const accessToken = req.body.token;
    if (accessToken) {
        try {
            const response = await axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            // Verifica se a resposta foi bem-sucedida
            if (response.status === 200) {
                const data = response.data;
                console.log(data);
                await User.create({
                    display_name: data.display_name,
                    email: data.email,
                    country: data.country,
                    access_token: accessToken
                });
            } else {
                throw new Error('Erro ao buscar informações do usuario');
            }
        } catch (error) {
            console.error('Erro ao buscar informações do usuario:', error);
            res.status(500).json({ error: 'Erro ao buscar infos do usuario' });
        }
    } else {
        res.status(400).json({ error: 'Token de acesso nao encontrado' });
    }
});

app.use('/game', express.static(__dirname + '/game'));

app.get("/getSecretData", (req, res) => {
    const port = process.env.PORT || 8080;
    const client_id = process.env.CLIENT_ID;
    const redirect_uri = process.env.REDIRECT_URI;
    res.send({ port, client_id, redirect_uri });
});

module.exports = app;
