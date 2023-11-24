const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'game.html'));
});

app.get('/callback', (req, res) => {
    // Lidar com a resposta de autenticação do Spotify
    const code = req.query.code || null;
    const state = req.query.state || null;

    // Tratar a autenticação aqui

    res.send('Autenticação concluída! Pode fechar esta janela.');
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});
