"use strict";
const connections = require("./connector")

//Sign up queries
const getEmails = function(req, res) {
    connections.query('SELECT email FROM user', (err, result, fields) =>{
        if(err) {
            throw err;
        }
        var userEmail = req.body.email;
        var userPassword = req.body.password;
        Object.keys(result).forEach(function(key){
            var tempEmail = result[key];
            if(tempEmail === userEmail){
                createUser(userEmail, userPassword);
            }
        })
        console.log(result);
    })
};

const createUser = function(req, res){
    connections.query("INSERT INTO user(email, password) VALUES ('"+req.body.email+"', '"+req.body.password+"')", (err, result)=>{
        if(err) {
            throw err;
        }
        res.status(200).redirect(301, "logged_in.html");
    })
};

//login queries
const getEmailPassword = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    console.log(req.body.email);
    connections.query("SELECT email, password FROM user WHERE email = '"+email+"'", (err, result, fields) =>{
        if(err) {
            throw err;
        }
        if(result[0] == undefined){
            res.status(200).send({success : true});
        }else{ 
        console.log("result "+result[0]);
        var row = result[0];
        var dbPassword = row.password;
        var dbEmail = row.email;
        if(dbPassword === password && dbEmail === email){
            res.json({success: true});
        } else {
            res.send("Email or password is incorrect");
        }
    }
    })
};

//Load all characters
const getCharacters = function(req, res) {
    connections.query('SELECT * FROM actor', (err, result, fields) =>{
        if(err) {
            throw err;
        }
        console.log(result);
        res.send(result);
    })
};

//Create a new character
const createCharacter = function(req, res){
    information = req.body.information;
    user_email = req.body.user_email;
    connections.query("INSERT INTO character(information, user_email) VALUES('"+information+"','"+user_email+"'", (err, result)=>{
        if(err) {
            throw err;
        }
        res.send("character created");
    })
};

//Update existing character
const updateCharacter = function(req, res){
    information = req.body.information;
    user_email = req.body.user_email;
    characterid = req.body.characterid;
    connections.query("UPDATE Character SET JSON = “JSON” WHERE id = "+id+" AND user_email = '"+user_email+"'", (err, result)=>{
        if(err) {
            throw err;
        }
        res.send("character updated");
    })
};

//Delete existing character
const deleteCharacter = function(req, res){
    user_email = req.body.user_email;
    characterid = req.body.characterid;
    connections.query("DELETE FROM character WHERE id = "+characterid+" AND user_email = '"+user_email+"'", (err, result)=>{
        if(err) {
            throw err;
        }
        res.send("character deleted");
    })
};

//Load all the ancestry options
const getAncestries = function(req, res){
    connections.query("SELECT * FROM ancestry", (err, result, fields) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send(result);
    })
};

//Load all the heritage options
const getHeritages = function(req, res){
    connections.query("SELECT * FROM heritage", (err, result, fields) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send(result);
    })
};

//Load all ancestry feats
const getAncestryFeats = function(req, res){
    connections.query("SELECT * FROM feats INNER JOIN ancestry_has_feats AS ahf ON feat.id = ahf.feat_id", (err, result, fields) =>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send(result);
    })
};

//Load all background options
const getBackgrounds = function(req, res){
    connections.query("SELECT * FROM background", (err, result, fields) =>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send(result);
    })
};

//Load all classes
const getClasses = function(req, res){
    connections.query("SELECT * FROM class", (err, result, fields) =>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send(result);
    })
};

//Load all class features
const getClassFeatures = function(req, res){
    connections.query("SELECT * FROM class_feature", (err, result, fields) =>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send(result);
    })
};

//Load all class options
const getClassOption = function(req, res){
    connections.query("SELECT * FROM class_option", (err, result, fields) =>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send(result);
    })
};

//Load class feats
const getClassFeats = function(req, res){
    connections.query("SELECT * FROM feat INNER JOIN class_has_feats AS chf ON feat.id = chf.feat_id", (err, result, fields) =>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send(result);
    })
};

module.exports = {
    getEmails: getEmails,
    createUser: createUser,
    getEmailPassword: getEmailPassword,
    getCharacters: getCharacters,
    createCharacter: createCharacter,
    updateCharacter: updateCharacter,
    deleteCharacter: deleteCharacter,
    getAncestries: getAncestries,
    getHeritages: getHeritages,
    getAncestryFeats: getAncestryFeats,
    getBackgrounds: getBackgrounds,
    getClasses: getClasses,
    getClassFeatures: getClassFeatures,
    getClassOption: getClassOption,
    getClassFeats: getClassFeats
};