import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
    dotenv.config()
    console.log("SMTP_USER:", process.env.SMTP_USER);
    console.log("SMTP_PASS:", process.env.SMTP_PASS ? "Provided" : "Missing");

const transporter= nodemailer.createTransport({

    host:'smtp-relay.brevo.com',
    port:2525,
    secure:false,
    auth:{
        user: process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
    }
})

export default transporter