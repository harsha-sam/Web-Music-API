require('dotenv').config({ path: __dirname + '/.env' })
const express = require("express");
const cors = require("cors");
const app = express();
const { handleLogin, handleRefreshToken,
    handleLyricsGet } = require("./controllers/index.js");
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json("Hello world")
})
app.post("/login", handleLogin);
app.post("/refresh", handleRefreshToken);
app.get("/lyrics", handleLyricsGet);
app.listen(process.env.PORT || 8081, () => {
    console.log("Listening")
})
