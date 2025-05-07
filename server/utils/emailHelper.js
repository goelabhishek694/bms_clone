//nodemailer
//resend

const nodemailer = require("nodemailer");
const axios = require("axios");
const https = require("https");
const fs = require("fs");
const path = require("path");
require("dotenv").config({path: "../.env"});
const {RESEND_API_KEY} = process.env;
console.log(RESEND_API_KEY);
const API_URL = "https://api.resend.com/emails";

function replaceContent(content, creds){
    const keys = Object.keys(creds); //["name", "otp"]
    console.log(keys);
    
    keys.forEach(key => {
        console.log(key, creds[key]);
        content = content.replace(`##{${key}}`, creds[key]);
    })
    console.log("after replacing", content);
    
    return content;
}

async function emailHelper(templateName, receiverEmail, creds) {
    try{
        const templatePath = path.join(__dirname, "email_templates", templateName);
        let content = await fs.promises.readFile(templatePath, 'utf-8');
        console.log(content);
        console.log(replaceContent(content, {"name": "Venkata", "otp": "1234"}));
        
        const emailDetails = {
            from: 'onboarding@resend.dev',
            // to: receiverEmail,
            to: "abhishek.goel_1@scaler.com",
            subject: "Mail from ScalerShows",
            text: `Hi ${creds.name} this is your reset password otp ${creds.otp}`,
            html: replaceContent(content, creds)
        }

        // const transportDetails = {
        //     host: "smtp.resend.com",
        //     port: 587,
        //     auth: {
        //         user: "resend",
        //         pass: RESEND_API_KEY
        //     }
        // }

        // const transporter = nodemailer.createTransport(transportDetails);
        // await transporter.sendMail(emailDetails);

        const response = await axios.post(
      API_URL,
      emailDetails,
      {
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );
        console.log("email sent");
        
    }catch(err){
        console.log(err);
    }
}

module.exports = emailHelper;

// emailHelper("otp.html", "refdc", {"name": "Venkata", "otp": "1234"});