const User = require("./../models/user");
const express = require("express");
const router = express.Router();

router.delete("/delete/:email", async function (req, res) {
    const error = await User.deleteOne({email: req.params.email});

    if (error) {
        console.log("Delete failed: " + error);
        res.status(200).send("User wasn't deleted, check the console log");
    }

    res.status(200).send("User with" + req.params.email + " was deleted");
});

router.get("/users", async function (req, res) {
    let {error,users} = await User.find({});

    if (error) {
        res.status(200).send("Cannot find any of users check the console log");
        console.log(error);
    }

    if (users !== undefined) {
        res.status(200).json(users);
    }

    res.status(403).send("None of users was found");
});

module.exports = router;
