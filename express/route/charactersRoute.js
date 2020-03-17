
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
    if(req.userData.email!=="UlaUla"){
        console.log("Cheese");
    }
    res.json({
        message: "Not allowed"
    });
    repository.getCharacters(req, res);
});

router.post("/", checkAuth, (req, res) => {
    repository.createCharacters(req, res);
});

router.put("/:id", checkAuth, (req, res) => {
    repository.updateCharacter(req, res);
});

router.delete("/:id", checkAuth, (req, res) => {
    repository.deleteCharacter(req, res);
});

router.get("/:id/ancestry", checkAuth, (req, res) => {
    repository.getAncestries(req, res);
});

router.get("/:id/heritage", checkAuth, (req, res) => {
    repository.getHeritages(req, res);
});

router.get("/:id/ancestryFeat", checkAuth, (req, res) => {
    repository.getAncestryFeats(req, res);
});

router.get("/:id/background", checkAuth, (req, res) => {
    repository.getBackgrounds(req, res);
});

router.get("/:id/class", checkAuth, (req, res) => {
    repository.getClasses(req, res);
});

router.get("/:id/classoption", checkAuth, (req, res) => {
    repository.getClassOption(req, res);
});

router.get("/:id/classfeature", checkAuth, (req, res) => {
    repository.getClassFeatures(req, res);
});

router.get("/:id/classfeat", checkAuth, (req, res) => {
    repository.getClassFeats(req, res);
});


module.exports = router;