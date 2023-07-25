const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');

async function generateOTP(email) {
    const otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: true,
        specialChars: false }
    );
    const data = {
        email,
        otp
    };
    const otp_hash = await bcrypt.hash(JSON.stringify(data), process.env.OTP_SALT);
    const iat = Math.floor(Date.now() / 1000);
    return { otp, otp_hash, iat };
}

async function verifyOTP({ email, otp }, { hash, iat, attempts } ) {
    if (isExpired(iat)) throw new Error("otp-expired");
    if (attempts >= process.env.OTP_MAX_ATTEMPTS) throw new Error("otp-max-attempts");
    const data = {
        email,
        otp
    };
    const newHash = await bcrypt.hash(JSON.stringify(data), process.env.OTP_SALT);
    return newHash === hash;
}

function isExpired(iat) {
    return (Math.floor(Date.now() / 1000) - iat > process.env.OTP_EXPIRATION_TIME);
}

module.exports = { generateOTP, verifyOTP, isExpired }