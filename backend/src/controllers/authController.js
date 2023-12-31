const User = require('../models/user');
const bcrypt = require('bcrypt');
const { SignJWT, jwtVerify } = require("jose");
const otpUtils = require('../utils/otp-utils');
const { sendOtpEmail, sendResetPasswordLinkEmail} = require('../utils/mailer');

async function register(req, res) {
    const { full_name, email, number, password} = req.body;

    const user = await User.findOne({email}).exec();
    let name = "";
    if (user) {
        if (user.verified) {
            return res.sendStatus(409);
        } else {
            name = user.name;
        }
    } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const names = full_name.trim().split(/\s+/);
        const surname = names.pop();
        name = names.join(" ");
        const role = {id: 0, key: "standard"}
        // Save user in db
        try {
            await User.create({name, surname, email, number, hash, role, verified: false, balance: 0});
        } catch (error) {
            console.log(error);
            return res.status(500).json({'message': 'Could not register'});
        }
    }

    try {
        // Test otp generation
        const { otp, otp_hash, iat } = await otpUtils.generateOTP(email);

        // Send email with OTP
        try {
            await sendOtpEmail(name, email, otp);
        } catch (error) {
            return res.sendStatus(500).json({'message': 'Could not register'});
        }

        // Set cookie with otp info
        const otpInfo = {hash: otp_hash, iat, attempts: 0};
        const cookieAttributes = { httpOnly: true, maxAge: 24*60*60*1000, overwrite: true};
        if (!req.useragent.isSafari) {
            Object.defineProperty(cookieAttributes, "sameSite", {value: 'None'});
            Object.defineProperty(cookieAttributes, "secure", {value: true});
        }
        res.cookie('otp_info', JSON.stringify(otpInfo), cookieAttributes);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.status(400).json({'message': 'Could not register'});
    }
}

async function newOTP(req, res) {
    const cookies = req.cookies;

    if (!cookies.otp_info) return res.sendStatus(400);

    // Find if last otp sent is expired
    const otp_info = JSON.parse(cookies.otp_info);
    if (otpUtils.isExpired(otp_info.iat)) return res.status(410).json({message: "error", code: "otp-expired"});

    const user = await User.findOne({ email: req.body.email }).exec();
    // Wrong email -> no user found -> 400: Bad request
    if (!user) return res.sendStatus(400);

    // User found but already verified -> 400: Bad request
    if (user.verified) return res.sendStatus(400);

    const { otp, otp_hash, iat } = await otpUtils.generateOTP(user.email);
    await sendOtpEmail(user.name, user.email, otp);

    const otpInfo = {hash: otp_hash, iat, attempts: 0};
    const cookieAttributes = { httpOnly: true, maxAge: 24*60*60*1000, overwrite: true};
    if (!req.useragent.isSafari) {
        Object.defineProperty(cookieAttributes, "sameSite", {value: 'None'});
        Object.defineProperty(cookieAttributes, "secure", {value: true});
    }
    res.cookie('otp_info', JSON.stringify(otpInfo), cookieAttributes);
    return res.sendStatus(200);
}

async function verifyOTP(req, res) {
    const cookies = req.cookies;

    if (!cookies.otp_info) return res.sendStatus(400);

    const user = await User.findOne({ email: req.body.email }).exec();
    // Wrong email -> no user found -> 400: Bad request
    if (!user) return res.sendStatus(400);

    // User found but already verified -> 400: Bad request
    if (user.verified) return res.sendStatus(400);

    try {
        const isValid = await otpUtils.verifyOTP(req.body, JSON.parse(cookies.otp_info));
        if (isValid) {
            // User verified -> set verifvied to true
            user.verified = true;
            await user.save();
            // Clear cookie after user is verified
            const cookieAttributes = { httpOnly: true }
            if (!req.useragent.isSafari) {
                Object.defineProperty(cookieAttributes, "sameSite", {value: 'None'});
                Object.defineProperty(cookieAttributes, "secure", {value: true});
            }
            res.clearCookie('otp_info', cookieAttributes);
            return res.sendStatus(202);
        } else {
            // Increment the number of attempts and update cookie
            const oldOtpInfo = JSON.parse(cookies.otp_info);
            const otpInfo = {hash: oldOtpInfo.hash, iat: oldOtpInfo.iat, attempts: oldOtpInfo.attempts + 1};
            const cookieAttributes = { httpOnly: true, maxAge: 24*60*60*1000, overwrite: true};
            if (!req.useragent.isSafari) {
                Object.defineProperty(cookieAttributes, "sameSite", {value: 'None'});
                Object.defineProperty(cookieAttributes, "secure", {value: true});
            }
            res.cookie('otp_info', JSON.stringify(otpInfo), cookieAttributes);
            return res.sendStatus(401);
        }
    } catch (error) {
        // Handle error
        if (error.message === "otp-expired") {
            // Remove user from db
            user.deleteOne({});
            // Clear otp_info cookie
            const cookieAttributes = { httpOnly: true }
            if (!req.useragent.isSafari) {
                Object.defineProperty(cookieAttributes, "sameSite", {value: 'None'});
                Object.defineProperty(cookieAttributes, "secure", {value: true});
            }
            res.clearCookie('otp_info', cookieAttributes);
            return res.status(410).json({message: "error", code: "otp-expired"});
        } else if (error.message === "otp-max-attempts") {
            return res.status(410).json({message: "error", code: "otp-max-attempts"});
        } else {
            console.log(error);
            // Remove user from db
            user.deleteOne({});
            // Clear otp_info cookie
            const cookieAttributes = { httpOnly: true }
            if (!req.useragent.isSafari) {
                Object.defineProperty(cookieAttributes, "sameSite", {value: 'None'});
                Object.defineProperty(cookieAttributes, "secure", {value: true});
            }
            res.clearCookie('otp_info', cookieAttributes);
            return res.status(500).json({ error: error.toString() });
        }
    }
}

async function cancel(req, res) {
    const cookies = req.cookies;

    // If otp expires cookie are cleared in verifyOTP
    if (cookies.otp_info) {
        const cookieAttributes = { httpOnly: true }
        if (!req.useragent.isSafari) {
            Object.defineProperty(cookieAttributes, "sameSite", {value: 'None'});
            Object.defineProperty(cookieAttributes, "secure", {value: true});
        }
        res.clearCookie('otp_info', cookieAttributes);
    }

    const user = await User.findOne({ email: req.body.email }).exec();
    // If otp expires user is deleted in verifyOTP
    if (user && !user.verified) user.deleteOne({});

    return res.sendStatus(200);
}

async function login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({email}).exec();
    if (!user) return res.status(401).json({'message': 'Email or password is incorrect'});

    const match = await bcrypt.compare(password, user.hash);
    if (!match) return res.status(401).json({'message': 'Email or password is incorrect'});

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

    const cookieAttributes = { httpOnly: true, maxAge: 24*60*60*1000 }
    if (!req.useragent.isSafari) {
        Object.defineProperty(cookieAttributes, "sameSite", {value: 'None'});
        Object.defineProperty(cookieAttributes, "secure", {value: true});
    }
    res.cookie('refresh_token', refreshToken, cookieAttributes);
    return res.json({'access_token': accessToken});
}

async function logout(req, res) {
    const cookies = req.cookies;

    if (!cookies.refresh_token) return res.sendStatus(204);

    const refreshToken = cookies.refresh_token;
    const user = await User.findOne({'refresh_token.value': refreshToken}).exec();

    if(!user) {
        const cookieAttributes = { httpOnly: true }
        if (!req.useragent.isSafari) {
            Object.defineProperty(cookieAttributes, "sameSite", {value: 'None'});
            Object.defineProperty(cookieAttributes, "secure", {value: true});
        }
        res.clearCookie('refresh_token', cookieAttributes);
        return res.sendStatus(204);
    }

    user.refresh_token = null;
    await user.save();

    const cookieAttributes = { httpOnly: true }
    if (!req.useragent.isSafari) {
        Object.defineProperty(cookieAttributes, "sameSite", {value: 'None'});
        Object.defineProperty(cookieAttributes, "secure", {value: true});
    }
    res.clearCookie('refresh_token', cookieAttributes);
    return res.sendStatus(204);
}

async function refresh(req, res) {
    const cookies = req.cookies;

    if (!cookies.refresh_token) return res.sendStatus(401);

    const refreshToken = cookies.refresh_token;

    const user = await User.findOne({'refresh_token.value': refreshToken}).exec();

    if(!user) return res.sendStatus(403);

    try {
        const refreshTokenSecret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);
        const {payload, protectedHeader} = await jwtVerify(refreshToken, refreshTokenSecret);
        if (user.id !== payload.id) return res.sendStatus(403);

        const alg = protectedHeader.alg;
        const accessTokenSecret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
        const accessToken = await new SignJWT({id: payload.id})
            .setProtectedHeader({alg})
            .setIssuedAt()
            .setExpirationTime(Math.floor((Date.now() / 1000) + Number(process.env.ACCESS_TOKEN_EXPIRATION_TIME)))
            .sign(accessTokenSecret);

        const newRefreshToken = await new SignJWT({id: payload.id})
            .setProtectedHeader({alg})
            .setIssuedAt()
            .setExpirationTime(user.refresh_token.iat + Number(process.env.REFRESH_TOKEN_EXPIRATION_TIME))
            .sign(refreshTokenSecret);

        user.refresh_token.value = newRefreshToken;
        await user.save();

        let cookieAttributes = { httpOnly: true }
        if (!req.useragent.isSafari) {
            Object.defineProperty(cookieAttributes, "sameSite", {value: 'None'});
            Object.defineProperty(cookieAttributes, "secure", {value: true});
        }
        res.clearCookie('refresh_token', cookieAttributes);
        cookieAttributes = { httpOnly: true, maxAge: 24*60*60*1000, overwrite: true};
        if (!req.useragent.isSafari) {
            Object.defineProperty(cookieAttributes, "sameSite", {value: 'None'});
            Object.defineProperty(cookieAttributes, "secure", {value: true});
        }
        res.cookie('refresh_token', newRefreshToken, cookieAttributes)
        return res.json({'access_token': accessToken});
    } catch (error) {
        console.log(error);
        if (error.code === "ERR_JWT_EXPIRED") {
            return res.status(400).json({message: "error", code: "token-expired"});
        } else {
            return res.sendStatus(500);
        }
    }
}

async function resetPassword(req, res) {
    const user = await User.findOne({ email: req.body.email }).exec();
    // Wrong email -> no user found -> 400: Bad request
    if (!user) return res.sendStatus(400);

    const alg = 'HS256';
    const resetPasswordTokenSecret = new TextEncoder().encode(process.env.RESET_PASSWORD_TOKEN_SECRET);
    const resetPasswordToken = await new SignJWT({id: user.id})
        .setProtectedHeader({alg})
        .setIssuedAt()
        .setExpirationTime(Math.floor((Date.now() / 1000) + Number(process.env.RESET_PASSWORD_TOKEN_EXPIRATION_TIME)))
        .sign(resetPasswordTokenSecret);

    // TODO: Generate link depending on reset token
    const link = `http://localhost:5173/reset-password?resetToken=${resetPasswordToken}&userId=${user.id}`

    await sendResetPasswordLinkEmail(user.name, user.email, link);

    return res.sendStatus(200)
}

async function changePassword(req, res) {
    const { resetToken, userId, password } = req.body;

    const user = await User.findOne({ _id: userId }).exec();
    if (!user) return res.sendStatus(400);

    try {
        const resetTokenSecret = new TextEncoder().encode(process.env.RESET_PASSWORD_TOKEN_SECRET);
        const {payload, _} = await jwtVerify(resetToken, resetTokenSecret);
        if (userId !== payload.id) return res.sendStatus(403);

        // Hash password and save in db
        const salt = await bcrypt.genSalt(10);
        user.hash = await bcrypt.hash(password, salt);
        await user.save();

        return res.sendStatus(200);
    } catch (error) {
        if (error.code === "ERR_JWT_EXPIRED") {
            return res.status(400).json({message: "error", code: "reset-token-expired"});
        } else {
            return res.sendStatus(500);
        }
    }
}

async function user(req, res) {
    if (req.user) {
        return res.status(200).json({'user_data': req.user});
    } else {
        return res.sendStatus(500);
    }
}

module.exports = { register, newOTP, verifyOTP, cancel, login, logout, refresh, resetPassword, changePassword, user }