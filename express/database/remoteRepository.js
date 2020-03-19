
"use strict";

const connections = require("../database/connector");

const getAllActors = function(req, res)  {
    connections.query('SELECT * FROM actor', (err, result, fields) =>{
        if(err) {
            res.send(err);
        }
        console.log(result);
        res.send(result);
    })
};

module.exports = {getAllActors : getAllActors};