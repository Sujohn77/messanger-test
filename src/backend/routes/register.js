const MailGun = require("mailgun-js");
const jwt = require("jsonwebtoken");
const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const User = require("./../models/user");
const checkBody = require("../middleWares/checkBody");

let response = require("../response");

router.post("/register", checkBody, async function (req, res) { // CHECK AN EMAIL AND SEND CODE
    const {email, password} = req.body;
    const {err, user} = await User.find({email, password});

    if (err) console.log(err);

    if (user !== undefined) {
        response = {
            resultCode: 1,
            data: {},
            message: "Email have already used"
        };
        res.status(403).json(response);
    }

    const api_key = process.env.API_KEY;
    const domain = process.env.DOMAIN;
    const ms = MailGun({apiKey: api_key, domain: domain});
    const verifyCode = crypto.randomBytes(7).toString('hex');

    const data = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Verify your email",
        text: "Back to messenger and paste this code " + verifyCode
    };

    try {
        let result = await ms.messages().send(data);

        if (result) {
            response = {
                resultCode: 0,
                data: {},
                message: "Message was sent"
            };
            res.status(200).json(response);
        }
    } catch (err) {
        response = {
            resultCode: 1,
            data: {},
            message: err
        };
        res.status(400).json(response);
    }
});

router.post("/register/me", async function (req, res) { // REGISTER USER
    const {email, password, firstName, lastName} = req.body;

    const err = await User.create({email, password, firstName, lastName});

    if (err) {
        // eslint-disable-next-line no-use-before-define
        response = {
            resultCode: 1,
            data: {},
            message: err
        };
        // eslint-disable-next-line no-use-before-define
        res.status(400).json(response);
    }

    let user = {email, password, firstName, lastName};

    const {error, token} = await jwt.sign({user: user}, "secretKey");

    if (error) {
        // eslint-disable-next-line no-use-before-define
        response = {
            resultCode: 1,
            data: {},
            message: error
        };
        // eslint-disable-next-line no-use-before-define
        res.status(400).json(response);
    }
    response = {
        resultCode: 0,
        data: {token},
        message: "You was registered"
    };
    res.status(200).json(response);
});

module.exports = router;