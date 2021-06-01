const geniusLyricsApi = require("genius-lyrics-api")

const handleLyricsGet = async (req, res) => {
    console.log("lyrics")
    const options = {
        apiKey: process.env.GENIUS_API_KEY,
        title: req.query.title,
        artist: req.query.artist, 
        optimizeQuery: true
    };
    geniusLyricsApi.getLyrics(options).then((lyrics) => {
        console.log(lyrics)
        if (!lyrics) res.json({ lyrics: "No lyrics found !" })
        else {
            res.json({ lyrics })
        }
    })
    .catch((err) => res.json({ lyrics: "No lyrics found !" }))
}
module.exports={
    handleLyricsGet
}