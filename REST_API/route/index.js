"use strict";

const express = require("express");
const router  = express.Router();
const connector = require("../database/connector")

router.get("/user/character", (req, res) => {
    res.send("character");
});

router.post("/user/character", (req, res) => {
    var userid = req.body.userid;
    var description = req.body.description;
    connector.saveCharacter(userid,description);
});

router.get("/user/character/charid/edit", (req, res) =>{
    res.send()
});

module.exports = router;