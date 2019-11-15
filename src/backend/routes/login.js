const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("./../models/user");
const verifyToken = require("./../verifyToken");
const checkBody = require("../middleWares/checkBody");

let response = require("../response");

router.post("/login",checkBody, async function (req, res) {
    const {email, password} = req.body;

    const {err, user} = await User.find({email: email, password: password});

    if (err) {
        response = {
            resultCode: 1,
            data: {},
            message: "Bad Request"
        };
        res.status(400).json(response);
    }

    if (user.length < 1) {
        response = {
            resultCode: 1,
            data: {},
            message: "Email or password is wrong"
        };
        res.status(400).json(response);
    }

    response = {
        resultCode: 0,
        data: {},
        message: "You are logged"
    };

    res.status(200).json(response)
});

router.post("/login",verifyToken, async function (req, res) {
    const {err, user} = await jwt.verify(req.body.token, "secretKey");

    if (err) {
        const response = {
            resultCode: 1,
            data: {},
            message: "Bad Request"
        };
        res.status(400).json(response);
    }
    response = {
        resultCode: 0,
        data: {user},
        message: "You are logged"
    };

    res.status(200).json(response);
});

module.exports = router;