const geniusLyricsApi = require("genius-lyrics-api")

const handleLyricsGet = async (req, res) => {
  console.log("req", req.query)
  const options = {
    apiKey: process.env.GENIUS_API_KEY,
    title: req.query.title,
    artist: req.query.artist,
    optimizeQuery: true
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