/**
 * General routes.
 */
"use strict";

var express = require('express');
var router  = express.Router();
const repository = require("../database/remoteRepository");
const checkAuth = require("../middleware/check-auth");


router.post("/users", (req, res) => {
    console.log(req.body);
    repository.signUp(req, res);
});

router.post("/login", (req, res) => {
    repository.login(req, res);
});

module.exports = router;