"use strict";

const connections = require("./connector");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Sign up queries
const signUp = function(req, res) {
    var user_email = req.body.email;
    connections.query('SELECT email FROM user where email = ?', [user_email], (err, result, fields) =>{ 
    if(err) {
        throw err;
    }
    var user_password = req.body.password;
    if(!result.length){
        console.log("hmm");
        createUser(user_email, user_password, res);

    } else {
        res.json({
            success:0,
            message: "account with that email already exist"
            });
        }
    })
};



const createUser = function(email, password, res){
    bcrypt.hash(password, 10, (err, hash) => {
        if(err){
            return res.status(500).json({
                success: 0,
                error: err
            });
        } else {
            connections.query("INSERT INTO user(email, password) VALUES (?, ?)",[email, hash], (err, result)=>{
                if(err) {
                    res.status(500).json({
                        success: 0,
                        error: err
                    });
                } else {
                    res.status(201).json({
                        success: 1,
                        message: "user created"
                    });  
                }
            });
        }
    });
};

//login queries
const login = function(req, res) {
    var user_email = req.body.email;
    var user_password = req.body.password;
    console.log(req.body);
    connections.query("SELECT email, password FROM user WHERE email = ?",[user_email], (err, result, fields) =>{
        if(err) {
            throw err;
        }
        if(!result.length || result[0] == undefined){
            return res.json({
                success:0,
                data: "Auth failed"
            });
        } 
        bcrypt.compare(user_password, result[0].password, (err, result) => {
            if(err){
                return res.status(401).json({
                    success: 0,
                    message: "Auth failed"
                });
            } else if(result) {
                const token = jwt.sign({
                    email: user_email
                },
                process.env.JWT_KEY, {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    success: 1,
                    message: "Auth successful",
                    token: token
                });
            }
            res.status(401).json({
                success: 0,
                message: "Auth failed"
            });
        }) ;
        
    });
};

//Load all characters
const getCharacters = function(req, res) {
    const user_email = getCookie("email", req.headers.cookie);
    connections.query('SELECT * FROM characters WHERE user_email = ?',[user_email], (err, result, fields) =>{
        if(err) {
            throw err;
        }
        res.json({
            success : 1,
            result : result
        });
    })
};

function getCookie(cname, cookies) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(cookies);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

//Create a new character
const createCharacter = function(req, res){
    let information = JSON.stringify(req.body);
    let user_email = getCookie("email", req.headers.cookie);
    connections.query("INSERT INTO characters(information, user_email) VALUES(?, ?)",[information, user_email], (err, result)=>{

        if(err) {
            throw err;
        }
        res.status(200).json({
            status: 1,
            message: "Character created"
        });
    })
};

//Update existing character
const updateCharacter = function(req, res){
    let information = req.body.information;
    let user_email = req.body.user_email;
    let characterid = req.body.characterid;
    connections.query("UPDATE Characters SET JSON = ? WHERE id = ? AND user_email = ?",[information, characterid, user_email], (err, result)=>{

        if(err) {
            throw err;
        }
        res.status(200).json({
            status: 1,
            message: "Character updated"
        });
    })
};

//Delete existing character
const deleteCharacter = function(req, res, characterid){
    const user_email = getCookie("email", req.headers.cookie);
    //characterid = req.body.characterid;
    connections.query("DELETE FROM characters WHERE id = ? AND user_email = ?",[characterid, user_email], (err, result)=>{
        if(err) {
            throw err;
        }
        res.status(200).json({
            status: 1,
            message: "Character deleted"
        });
    })
};

//Load all the ancestry options
const getAncestries = function(req, res){
    connections.query("SELECT * FROM ancestry", (err, result, fields) => {
        if(err){
            throw err;
        }
        res.json({
            success : 1,
            result : result
        });
    })
};

//Load all the heritage options
const getHeritages = function(req, res){
    connections.query("SELECT * FROM heritage", (err, result, fields) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.json({
            success : 1,
            result : result
        });
    })
};

//Load all ancestry feats
const getAncestryFeats = function(req, res){
    connections.query("SELECT * FROM feat INNER JOIN ancestry_has_feat AS ahf ON feat.id = ahf.feat_id", (err, result, fields) =>{
        if(err){
            throw err;
        }
        console.log(result);
        res.json({
            success : 1,
            result : result
        });
    })
};

//Load all background options
const getBackgrounds = function(req, res){
    connections.query("SELECT * FROM background", (err, result, fields) =>{
        if(err){
            throw err;
        }
        console.log(result);
        res.json({
            success : 1,
            result : result
        });
    })
};

//Load all classes
const getClasses = function(req, res){
    connections.query("SELECT * FROM class", (err, result, fields) =>{
        if(err){
            throw err;
        }
        console.log(result);
        res.json({
            success : 1,
            result : result
        });
    })
};

//Load all class features
const getClassFeatures = function(req, res){
    connections.query("SELECT * FROM class_feature", (err, result, fields) =>{
        if(err){
            throw err;
        }
        console.log(result);
        res.json({
            success : 1,
            result : result
        });
    })
};

//Load all subclasses
const getSubclasses = function(req, res){
    connections.query("SELECT * FROM subclass", (err, result, fields) =>{
        if(err){
            throw err;
        }
        console.log(result);
        res.json({
            success : 1,
            result : result
        });
    })
};

//load all subclass options
const getSubclassOptions = function(req,res){
    connections.query("SELECT * FROM subclass_option", (err, result, fields) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.json({
            success : 1,
            result : result
        });
    })
};

//Load class feats
const getClassFeats = function(req, res){
    connections.query("SELECT * FROM feat INNER JOIN class_has_feat AS chf ON feat.id = chf.feat_id", (err, result, fields) =>{
        if(err){
            throw err;
        }
        console.log(result);
        res.json({
            success : 1,
            result : result
        });
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
    getClassFeats: getClassFeats,
    getSubclasses: getSubclasses,
    getSubclassOptions: getSubclassOptions

};