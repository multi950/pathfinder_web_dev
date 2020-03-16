"use strict";

const connections = require("./connector");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Sign up queries
const signUp = function(req, res) {
    var userEmail = req.body.email;
    connections.query('SELECT email FROM user where email = ?', [userEmail], (err, result, fields) =>{ 
    if(err) {
        throw err;
    }
    var userPassword = req.body.password;
    if(!result.length){
        console.log("hmm");
        createUser(userEmail, userPassword);
        res.json({
            success:1,
            message: "account created"
        });
    } else {
        res.json({
            success:0,
            message: "account with that email already exist"
            });
        }
    })
};



const createUser = function(email, password){
    connections.query("INSERT INTO user(email, password) VALUES (?, ?)",[email, password], (err, result)=>{
        if(err) {
            throw err;
        }
    })
};

//login queries
const login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    connections.query("SELECT email, password FROM user WHERE email = '"+email+"'", (err, result, fields) =>{
        if(err) {
            throw err;
        }
        if(!result.length){
            return json({
                success:0,
                data: "Invalid email or password email"
            });
        }
    
        if(password===result[0].password){
            const token = jwt.sign({
                email: email
            },
            process.env.JWT_KEY, {
                expiresIn: "1h"
            });
            return res.json({
                success:1,
                message: "login successfully",
                token: token
            });
        } else {
            return res.json({
                success:0,
                data: "Invalid email or password password"
            });
        }
       /* console.log(result);
        var row = result[0];
        var dbPassword = row.password;
        var dbEmail = row.email;
        if(dbPassword === password && dbEmail === email){
            res.send("user verified");
        } else {
            res.send("Email or password is incorrect");
        }*/
    });
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
    signUp: signUp,
    createUser: createUser,
    login: login,
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