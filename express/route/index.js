"use strict";

var express = require("express");
const router  = express.Router();
const connections = require("../database/connector")

/*Load all saved characters*/



router.get("/character", (req, res) => {
    connections.query('SELECT * FROM character', (err, result, fields) =>{
        if(err) {
            throw err;
        }
        console.log(result);
        res.send(result);
    })
});


router.get("/user/character", (req, res) => {
    var userid = req.body.userid;
    var characters = connector.loadCharacters(userid);
    res.send(characters);
});

/*Create a new character*/
router.post("/user/character", (req, res) => {
    var userid = req.body.userid;
    var description = req.body.description;
    connector.saveCharacter(userid,description);
});

module.exports = router;