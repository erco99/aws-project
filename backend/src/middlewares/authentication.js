const jwt = require('jose');
const User = require('../models/user');
const {jwtVerify} = require("jose");

async function authentication(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if(authHeader?.startsWith('Bearer')) {
        const token = authHeader.split(' ')[1]

        const accessTokenSecret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
        try {
            const {payload, protectedHeader} = await jwtVerify(token, accessTokenSecret);
            User.findOne({_id: payload.id})
                .then(next())
                .catch((err) => {
                    console.log(err)
                    return res.status(401).json({message: "error", code: "unauthenticated-access"})
                })
        } catch (error) {
            console.log(error)
            return res.status(400).json({message: "error", code: "token-expired"})
        }

    } else {
        return res.status(401).json({message: "error", code: "unauthenticated-access"})
    }
}

module.exports = authentication