global.dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const User = require("./db/model/Usuario");
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

(async () => {
    try {
        await User.sync();
        console.log("Database initialized!");
    } catch (error) {
        console.error("Erro ao sincronizar o modelo:", error);
    }
})();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
});

app.get("/game", (req, res) => {
    res.sendFile(__dirname + "/public/main.html");
});

app.get("/getSecretData", (req, res) => {
    const client_id = process.env.CLIENT_ID;
    const redirect_uri = process.env.REDIRECT_URI;
    res.send({ port, client_id, redirect_uri });
});

app.use(express.static("public"));

module.exports = app;
