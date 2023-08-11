const nodemailer = require('nodemailer');
const Mailgen = require("mailgen");
const config = require("../configs/nodemailer");


const mailGenerator = new Mailgen({
    theme: "salted",
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: config.user,
            pass: config.pass
        },
    }
)

async function sendOtpEmail(username, userEmail, otp) {
    const email = {
        body: {
            greeting: 'Ciao',
            name: username,
            intro: "Grazie per esserti registrato! Inserisci il codice che ti abbiamo inviato per verificare il tuo account",
            outro: [`<div style='font-size: 20px; font-weight: bold; border-top: 15px; border-bottom: 15px; 
                        border-left: 25px; border-right: 25px; width: 120px; height: 50px; background-color: #22BC66; 
                        color: white; -webkit-border-radius: 3px; display: flex; justify-content: center; 
                        align-items: center;'>
                    ${otp}
                    </div>`, "Il codice scadrà tra 5 minuti.", "Ti serve aiuto? Rispondi a questa email, anche se noi non ti risponderemo!"]
        }
    }
    const emailBody = mailGenerator.generate(email);

    const message = {
        from: config.user,
        to: userEmail,
        subject: "Verifica il tuo account",
        html: emailBody
    }

    try {
        const info = await transporter.sendMail(message);
        console.log("Sent OTP email URL: " + nodemailer.getTestMessageUrl(info))
        transporter.close();
    } catch (error) {
        throw new Error("Error while sending email")
    }
}

async function sendResetPasswordLinkEmail(username, userEmail, link) {
    const email = {
        body: {
            greeting: 'Ciao',
            name: username,
            intro: "Qualcuno ha richiesto di reimpostare la password per questo account",
            action: {
                instructions: 'Per reimpostare la tua password clicca qui sotto:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Reimposta la tua password',
                    link: link
                }
            },
            outro: "Se non hai richiesto la reimpostazione della password, puoi tranquillamente ignorare questa email. Solo una persona con accesso alla tua email può reimpostare la password del tuo account"
        }
    }
    const emailBody = mailGenerator.generate(email);

    const message = {
        from: config.user,
        to: userEmail,
        subject: "Reimposta la tua password",
        html: emailBody
    }

    try {
        const info = await transporter.sendMail(message);
        console.log("Sent password reset email URL: " + nodemailer.getTestMessageUrl(info))
        transporter.close();
    } catch (error) {
        throw new Error("Error while sending email")
    }
}

module.exports = { sendOtpEmail, sendResetPasswordLinkEmail }