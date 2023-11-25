global.dotenv = require('dotenv').config()
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/game', (req, res) => {
    res.sendFile(__dirname + '/public/main.html');
});

app.get('/getSecretData', (req, res) => {
    const client_id = process.env.CLIENT_ID;
    const redirect_uri = process.env.REDIRECT_URI;
    res.send({port, client_id, redirect_uri});
  });

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});
