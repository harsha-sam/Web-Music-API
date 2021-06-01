require('dotenv').config({ path: __dirname + '/.env' })
const express = require("express");
const cors = require("cors");
const app = express();
const { handleLogin, handleRefreshToken,
    handleLyricsGet, handleEmotionDetect } = require("./controllers/index.js");
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json("Hello world")
})
app.post("/login", handleLogin);
app.post("/refresh", handleRefreshToken);
app.get("/lyrics", handleLyricsGet);
app.post("/detect-emotion", handleEmotionDetect);
app.listen(process.env.PORT || 3001, () => {
    console.log("Listening")
})
