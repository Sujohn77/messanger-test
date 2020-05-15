//LIBRARIES
const MailGun = require("mailgun-js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
//MODELS
const User = require("../models/user");
const VerifyInfo = require("../models/verifyInfo");

const userServices = require("./../services/userRequests");

let response = require("./../response");

const registerController = {};

const ms = MailGun({
    apiKey: "13e425b336dcb176546a043b651467fb-3e51f8d2-12243019",
    domain:"sandbox46fcb2d7f8ed4e00a72323fca5520b7b.mailgun.org"
});

registerController.sendEmail = async (req, res) => { // CHECK AN EMAIL AND SEND CODE
    const {email, password} = req.body;

    User.find({email, password}, async (err, user) => {
        if (err) {
            console.log(err);
        }

        if (user.length > 1) {
            response = {
                resultCode: 1,
                data: {},
                message: "Email have already used"
            };
            res.status(403).json(response);
        } else {

            const verifyCode = crypto.randomBytes(3).toString("hex");
            console.log(email);
            const data = {
                from: process.env.EMAIL_FROM || "Test Messenger stonebo0sh76@gmail.com",
                to: email,
                subject: "Verify your email",
                text: "Back to messenger and paste this code " + verifyCode
            };

            try {
                ms.messages().send(data, (err) => {
                    if (err) {
                        response = {
                            resultCode: 1,
                            data: {},
                            message: "Failed send message on your email with error: " + err
                        };
                        res.status(403).json(response);
                    } else {
                        VerifyInfo.create({email, code: verifyCode}, (err) => {
                            if (err) {
                                console.log(err);
                            }

                            response = {
                                resultCode: 0,
                                data: {},
                            };
                            res.status(200).json(response);
                        });

                    }
                });
            } catch (err) {
                console.log(err)
            }
        }
    });
};

registerController.verifyCode = async (req, res) => {
    VerifyInfo.findOne({code: req.body.code}, (err, verifyInfo) => {
        if (err) {
            console.log(err);
        }

        if (verifyInfo !== null) {
            response = {
                resultCode: 0,
                data: {}
            };

            res.status(200).json(response);
        } else {
            response = {
                resultCode: 1,
                data: {},
                message: "Wrong code"
            };

            res.status(200).json(response);
        }
    });
};


registerController.registerMe = async (req, res) => {
    const {email, password, firstName, lastName} = req.body;

    User.find({email},(err,user)=>{
        if(err){
            console.log(err)
        }

        if(user.length !== 0){
            response = {
                data:{},
                message:"This email already registered",
                resultCode: 1
            }
            res.status(400).json(response);
        }
    });

    User.create({email, password, firstName, lastName,chatsId : [],friendsId:[]}, async (err) => {
        if (err) {
            console.log(err);
        }
        else {
            const dataToken = {email, password};

            jwt.sign({user: dataToken}, "secretKey",async (error, token) => {
                if (error) {
                    console.log(err)
                }

                const user = await userServices.findUserByFilter(email, "email");

                response = {
                    resultCode: 0,
                    data: {token,user,_id:user.id}
                };
                res.status(200).json(response);
            });
        }
        
    });
};

module.exports = registerController;