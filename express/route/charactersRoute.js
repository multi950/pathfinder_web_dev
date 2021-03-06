
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
    repository.getCharacters(req, res);
});

router.post("/", checkAuth, (req, res) => {
    repository.createCharacter(req, res);
});

router.put("/:id", (req, res) => {

    repository.updateCharacter(req, res);
});

router.delete("/:id", checkAuth, (req, res) => {
    console.log(" WE ARE DELETING");
    const id = req.params.id;
    repository.deleteCharacter(req, res, id);
});


module.exports = router;