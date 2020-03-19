
/**
 * General routes.
 */
"use strict";

var express = require('express');
var router  = express.Router();
const repository = require("../database/remoteRepository");
const checkAuth = require("../middleware/check-auth");

router.get("/", checkAuth, (req, res) => {
    console.log(req.userData);
    if(req.userData.email!=="Multi950@gmail.com"){
        console.log("Cheese");
    }
    repository.getCharacters(req, res);
});

router.post("/", (req, res) => {
    res.json({
        message: "WORKING!"
    });
    //repository.createCharacters(req, res);
});
router.get("/ancestries", (req, res) => {
    repository.getAncestries(req, res);
});
router.put("/:id", (req, res) => {
    repository.updateCharacter(req, res);
});

router.delete("/:id", checkAuth, (req, res) => {
    repository.deleteCharacter(req, res);
});

router.get("/:id/ancestry", (req, res) => {
    res.json({
        success:1,
        message: "you are the best"
    });
    //repository.getAncestries(req, res);
});

router.get("/:id/heritage", (req, res) => {
    repository.getHeritages(req, res);
});

router.get("/:id/ancestryFeat", (req, res) => {
    repository.getAncestryFeats(req, res);
});

router.get("/:id/background", (req, res) => {
    repository.getBackgrounds(req, res);
});

router.get("/:id/class", (req, res) => {
    repository.getClasses(req, res);
});

router.get("/:id/classoption", (req, res) => {
    repository.getClassOption(req, res);
});

router.get("/:id/classfeature", (req, res) => {
    repository.getClassFeatures(req, res);
});

router.get("/:id/classfeat", (req, res) => {
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