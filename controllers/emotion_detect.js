const qs = require('qs')
const axios = require("axios");
const handleEmotionDetect = async(req, res) => {
    const { imageUrl }= req.body;
    const subscriptionKey = process.env.AZURE_SUBSCRIPTION_KEY
    const endpoint = process.env.AZURE_FACE_SERVICE_ENDPOINT
    try{
        const response = await axios({
            method: 'post',
            url: endpoint,
            params : {
                detectionModel: 'detection_01',
                returnFaceAttributes: 'emotion'
            },
            data: {
                url: imageUrl,
            },
            headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
        })
        const emotions = response.data[0].faceAttributes.emotion
        const acc = Object.keys(emotions).reduce((acc, key) => {
            return emotions[key] > emotions[acc] ? key : acc
        })
        console.log(emotions)
        res.json(acc)
    }
    catch(err){
        res.status(400).json("Something went wrong !")
    }
}
module.exports={
    handleEmotionDetect
}