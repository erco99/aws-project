const User = require('../models/user');
const bcrypt = require('bcrypt');
const { SignJWT, jwtVerify } = require("jose");
const optUtils = require('../utils/otp-utils');
const { sendEmail } = require('../utils/mailer');

async function register(req, res) {
    const { full_name, email, number, password } = req.body;

    const user = await User.findOne({email});
    if (user) return res.sendStatus(409)

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const names = full_name.trim().split(/\s+/);
        const surname = names.pop();
        const name = names.join(" ");

        // Save user in db
        await User.create({name, surname, email, number, hash});

        // Test otp generation
        const { otp, otpHash } = await optUtils.generateOTP(email);

        // Send email with OTP
        await sendEmail(name, email, otp);
        // Display otp for debug
        console.log("Generated OTP: " + otp)

        // Send response with optHash as body
        return res.status(200).json({'otp_hash': otpHash});
    } catch (error) {
        console.log(error);
        return res.status(400).json({'message': 'Could not register'});
    }
}

async function verifyOTP(req, res) {
    const isValid = await optUtils.verifyOTP(req.body)
    return res.sendStatus(isValid ? 200 : 401)
}

async function login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(401).json({'message': 'Email or password is incorrect'})

    const match = await bcrypt.compare(password, user.hash)
    if (!match) return res.status(401).json({'message': 'Email or password is incorrect'})

    const alg = 'HS256';
    const accessTokenSecret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
    const accessToken = await new SignJWT({id: user.id})
        .setProtectedHeader({alg})
        .setIssuedAt()
        .setExpirationTime(Math.floor((Date.now() / 1000) + Number(process.env.ACCESS_TOKEN_EXPIRATION_TIME)))
        .sign(accessTokenSecret);

    const iat = Math.floor(Date.now() / 1000);
    const refreshTokenSecret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);
    const refreshToken = await new SignJWT({id: user.id})
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime(iat + Number(process.env.REFRESH_TOKEN_EXPIRATION_TIME))
        .sign(refreshTokenSecret);

    user.refresh_token = {value: refreshToken, iat: iat};
    await user.save();

    return res.cookie('refresh_token', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000, sameSite: 'None', secure: true})
        .json({'access_token': accessToken});
}

async function logout(req, res) {
    const cookies = req.cookies;

    if (!cookies.refresh_token) return res.sendStatus(204);

    const refreshToken = cookies.refresh_token
    const user = await User.findOne({'refresh_token.value': refreshToken});

    if(!user) {
        return res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'None', secure: true})
            .sendStatus(204);
    }

    user.refresh_token = null;
    await user.save();

    return res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'None', secure: true})
        .sendStatus(204);
}

async function refresh(req, res) {
    const cookies = req.cookies;

    if (!cookies.refresh_token) return res.sendStatus(401);

    const refreshToken = cookies.refresh_token;

    const user = await User.findOne({'refresh_token.value': refreshToken});

    if(!user) return res.sendStatus(403);

    const refreshTokenSecret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);
    const { payload, protectedHeader } = await jwtVerify(refreshToken, refreshTokenSecret);
    if (user.id !== payload.id) return res.sendStatus(403);

    const alg = protectedHeader.alg;
    const accessTokenSecret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
    const accessToken = await new SignJWT({id: payload.id})
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime(Math.floor((Date.now() / 1000) + Number(process.env.ACCESS_TOKEN_EXPIRATION_TIME)))
        .sign(accessTokenSecret);

    const newRefreshToken = await new SignJWT({id: payload.id})
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime(user.refresh_token.iat + Number(process.env.REFRESH_TOKEN_EXPIRATION_TIME))
        .sign(refreshTokenSecret);

    user.refresh_token.value = newRefreshToken;
    await user.save();

    return res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'None', secure: true})
        .cookie('refresh_token', newRefreshToken, {httpOnly: true, maxAge: 24*60*60*1000, sameSite: 'None', secure: true})
        .json({'access_token': accessToken});
}

async function user(req, res) {
    const authHeader = req.headers.authorization || req.headers.Authorization
    const token = authHeader.split(' ')[1]
    const accessTokenSecret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
    const {payload, protectedHeader} = await jwtVerify(token, accessTokenSecret);
    User.findOne({_id: payload.id}, {name: 1, surname: 1, email: 1, number: 1, _id:0})
        .then(user => {
            return res.status(200).json({user_data: user})
        }).catch(error => {
            console.log(error)
            return res.sendStatus(500)
        })
}

module.exports = { register, verifyOTP, login, logout, refresh, user }