const express = require("express");
const cors = require("cors");
const qs = require('qs')
const axios = require("axios");
const app = express();

const client_id = "449154ee43934fedaf41f90755746f08"
const client_secret = "288f1b18784249deb6b25f90ef079707"
const redirect_uri = "http://localhost:3000"

// After getting the authorization code
const AUTH_URI = "https://accounts.spotify.com/api/token" 
const geniusLyricsApi = require("genius-lyrics-api")

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json("Hello world")
})

app.post("/login", async (req, res) => {
    console.log("login")
    const { authorizationCode } = req.body
    try {
        const response = await axios({
            method: 'post',
            url: AUTH_URI,
            data: qs.stringify({
                code: authorizationCode,
                grant_type: "authorization_code",
                redirect_uri,
                client_id,
                client_secret
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
        console.log({
            access_token: response.data.access_token,
            expires_in: response.data.expires_in,
            refresh_token: response.data.refresh_token
        })
        res.json({
            access_token: response.data.access_token,
            expires_in: response.data.expires_in,
            refresh_token: response.data.refresh_token
        })
    }
    catch (err) {
        console.log("error", err)
        res.status(400).json("Something went wrong")
    }
})

app.post("/refresh", async (req, res) => {
    console.log("refresh request")
    const { refreshToken } = req.body
    try {
        const response = await axios({
            method: 'post',
            url: AUTH_URI,
            data: qs.stringify({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
                client_id,
                client_secret
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
        console.log({
            access_token: response.data.access_token,
            expires_in: response.data.expires_in
        })
        res.json({
            access_token: response.data.access_token,
            expires_in: response.data.expires_in
        })
    }
    catch (err) {
        console.log("error", err)
        res.status(400).json("Something went wrong")
    }
})

app.get("/lyrics", async (req, res) => {
    console.log("lyrics")
    const options = {
        apiKey: 'JKAN_ktk0H0StInXHT0GJA8LjKj0NB9ba9a5ZJEoWzUrI_GleJPTcQ3ozoWSpvTS',
        title: req.query.title,
        artist: req.query.artist,
        optimizeQuery: true
    };
    geniusLyricsApi.getLyrics(options).then((lyrics) =>{
        console.log(lyrics)
        if (!lyrics) res.json({lyrics: "No lyrics found !"})
        else{
            res.json({lyrics})
        }
    })
    .catch((err) => res.json({lyrics: "No lyrics found !"}))
})
app.listen("3001", () => {
    console.log("Listening")
})
