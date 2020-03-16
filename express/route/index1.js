/**
 * General routes.
 */
"use strict";

var express = require('express');
var router  = express.Router();

const connections = require("../database/connector");
const repository = require("../database/remoteRepository");

var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

//TESTING
router.post("/register", (req, res) => {
    console.log(req.body);
    repository.createUser(req, res);
    
});


router.get("/user", (req, res) => {
    repository.getEmails(req, res);
});

router.post("/user/email", (req, res) => {
    console.log("request body:");
    console.log(req.body);
    repository.getEmailPassword(req, res);
});
//FOR TESTING
router.get("/user/email", (req, res) => {
    console.log("request query:");
    console.log(req.query);
    repository.getEmailPassword(req, res);
});
//TESTING
router.post("/test", (req, res) => {
    console.log("request body:");
    console.log(req.body);
    res.json({success : true})
});

router.get("/character", (req, res) => {
    repository.getCharacters(req, res);
});

router.post("/character/create", (req, res) => {
    repository.createCharacters(req, res);
});

router.put("/character/id/update", (req, res) => {
    repository.updateCharacter(req, res);
});

router.delete("/character/id/delete", (req, res) => {
    repository.deleteCharacter(req, res);
});

router.get("/character/id/edit/ancestry", (req, res) => {
    repository.getAncestries(req, res);
});

router.get("/character/id/edit/heritage", (req, res) => {
    repository.getHeritages(req, res);
});

router.get("/character/id/edit/ancestryFeat", (req, res) => {
    repository.getAncestryFeats(req, res);
});

router.get("/character/id/edit/background", (req, res) => {
    repository.getBackgrounds(req, res);
});

router.get("/character/id/edit/class", (req, res) => {
    repository.getClasses(req, res);
});

router.get("/character/id/edit/classoption", (req, res) => {
    repository.getClassOption(req, res);
});

router.get("/character/id/edit/classfeature", (req, res) => {
    repository.getClassFeatures(req, res);
});

router.get("/character/id/edit/classfeat", (req, res) => {
    repository.getClassFeats(req, res);
});

/*
router.get("/character/create", (req, res) => {
    var userid = req.body.userid;
    var json = req.body.description;
    connections.query('INSERT INTO Character (“JSON”, “ID”) VALUES(“'+json+'”,”'+userid+'”)', function(err, result){
        if(err) throw err;
        res.send('character has been created');
    })
});*/

module.exports = router;