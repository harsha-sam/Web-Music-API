const geniusLyricsApi = require("genius-lyrics-api")

const handleLyricsGet = async (req, res) => {
  const options = {
    apiKey: process.env.GENIUS_API_KEY,
    title: req.query.title,
    artist: req.query.artist,
    optimizeQuery: true,
    authHeader: true
  };
  geniusLyricsApi.getLyrics(options).then((lyrics) => {
    if (!lyrics) res.json({ lyrics: "No lyrics found !" })
    else {
      res.json({ lyrics })
    }
  })
    .catch((err) => {
      console.log(err, "error")
      res.json({ lyrics: "No lyrics found !" })
    })
}
module.exports={
    handleLyricsGet
}