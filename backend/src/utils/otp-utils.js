const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');

async function generateOTP(email) {
    const otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: true,
        specialChars: false }
    )
    const data = {
        email,
        otp
    }
    const otpHash = await bcrypt.hash(JSON.stringify(data), process.env.OTP_SALT)
    return { otp, otpHash };
}

async function verifyOTP({ email, otp, hash }) {
    const data = {
        email,
        otp
    }
    const newHash = await bcrypt.hash(JSON.stringify(data), process.env.OTP_SALT)
    return newHash === hash
}

module.exports = { generateOTP, verifyOTP }