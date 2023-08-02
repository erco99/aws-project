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
            User.findOne({_id: payload.id}, {name: 1, surname: 1, email: 1, number: 1, balance:1, _id:0})
                .then(data => {
                    req.user = data
                    next()
                })
                .catch((err) => {
                    console.log(err)
                    return res.status(401).json({message: "error", code: "unauthenticated-access"})
                })
        } catch (error) {
            return res.status(401).json({message: "error", code: "token-expired"})
        }

    } else {
        return res.status(401).json({message: "error", code: "unauthenticated-access"})
    }
}

module.exports = authentication