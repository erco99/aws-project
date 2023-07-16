const User = require('../models/user');
const jwt = require('jose');
const bcrypt = require('bcrypt');

async function register(req, res) {
    const { full_name, email, number, password } = req.body;

    const user = await User.findOne({email});
    if (user) return res.status(409)

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const [ name, surname ] = full_name.trim().split(/\s+/);
        await User.create({name, surname, email, number, hash});
        return res.sendStatus(201)
    } catch (error) {
        console.log(error);
        return res.status(400).json({'message': 'Could not register'})
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(401).json({'message': 'Email or password is incorrect'})

    const match = await bcrypt.compare(password, user.hash)
    if (!match) return res.status(401).json({'message': 'Email or password is incorrect'})

    const alg = 'HS256';
    const accessTokenSecret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
    const accessToken = await new jwt.SignJWT({username: user.full_name})
        .setProtectedHeader({alg})
        .setExpirationTime('1800s')
        .sign(accessTokenSecret);

    const refreshTokenSecret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);
    const refreshToken = await new jwt.SignJWT({username: user.full_name})
        .setProtectedHeader({ alg })
        .setExpirationTime('1d')
        .sign(refreshTokenSecret);

    user.refresh_token = refreshToken;
    await user.save();

    return res.cookie('refresh_token', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000, sameSite: 'None', secure: true})
        .json({'access_token': accessToken});
}

async function logout(req, res) {
    const cookies = req.cookies;

    if (!cookies.refresh_token) return res.sendStatus(204);

    const refreshToken = cookies.refresh_token
    const user = await User.findOne({refresh_token: refreshToken});

    if(!user) {
        return res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'None', secure: true})
            .sendStatus(204);
    }

    user.refresh_token = null;
    await user.save();

    return res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'None', secure: true})
        .sendStatus(204);
}

module.exports = { register, login, logout }