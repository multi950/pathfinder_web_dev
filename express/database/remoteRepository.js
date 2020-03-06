"use strict";

const connections = require("./connector")

const function1 = function(req, res) {
    connections.query('SELECT * FROM actor', (err, result, fields) =>{
        if(err) {
            throw err;
        }
        console.log(result);
        res.send(result);
    })
};