global.dotenv = require('dotenv').config()
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/main.html');
});

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});
