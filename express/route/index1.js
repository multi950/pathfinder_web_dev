/**
 * General routes.
 */
"use strict";

var express = require('express');
var router  = express.Router();
const connections = require("../database/connector");
const remoteRepository = require("../database/remoteRepository");


/*router.get("/character", function(req, res)  {
    connections.query('SELECT * FROM actor', (err, result, fields) =>{
        if(err) {
            throw err;
        }
        console.log(result);
        res.send(result);
    })
});*/

router.get("/character", (req,res) => remoteRepository.function1(req,res));

module.exports = router;