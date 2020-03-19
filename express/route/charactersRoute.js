
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

router.post("/", checkAuth, (req, res) => {
    repository.createCharacters(req, res);
});

router.put("/:id", (req, res) => {

    repository.updateCharacter(req, res);
});

router.delete("/:id", checkAuth, (req, res) => {
    repository.deleteCharacter(req, res);
});


module.exports = router;