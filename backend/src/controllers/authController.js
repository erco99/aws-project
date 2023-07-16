const User = require('../models/user');
const jwt = require('jose');
const bcrypt = require('bcrypt');

async function login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({email})
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

    res.cookie('refresh_token', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000});
    res.json({'access_token': accessToken});
}

module.exports = { login }