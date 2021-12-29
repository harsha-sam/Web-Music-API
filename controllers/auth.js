const qs = require('qs')
const axios = require("axios");
const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
const redirect_uri = process.env.REDIRECT_URI
const AUTH_URI = process.env.AUTH_URI

const handleLogin = async (req, res) => {
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
        const { access_token, expires_in, refresh_token } = response.data;
        console.log({ access_token, expires_in, refresh_token })
        res.json({
            access_token,
            expires_in,
            refresh_token
        })
    }
    catch (err) {
        res.status(400).json("Something went wrong")
    }
}

const handleRefreshToken = async (req, res) => {
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
        res.status(400).json("Something went wrong")
    }
}
module.exports = {
    handleLogin,
    handleRefreshToken
}