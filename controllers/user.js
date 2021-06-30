// Page Js qui prends en charge les configurations permettant de setup les routes concernant l'authentification
const User = require('../models/user');
const fse = require('fs-extra')

exports.findUser = (req, res) => {
    User.findById(req.params.userId,(err,data) =>{
        if(err){
            if(err.kind === 'no found'){
                res.status(404).send({
                    message: `No found ${req.params.iduser}`,
                });
            } else {
                res.status(500).send({
                    message: "Error" + req.params.iduser
                });
            }
        } else res.send(data);
    })
};

exports.findAllusers = (req, res) => {
    User.getAll((err, data) =>{
        if(err)
        res.status(500).send({
            message: err.message 
        });
        else res.send(data);
    });
};

exports.updateUser = (req, res) =>{
    if(!req.body){
        res.status(400).send({
            message: 'empty',
        });
    }
    const user = new User({
        name: req.body.name,
    });

    User.updateById(req.params.iduser, user, (err,data) =>{
        if(err) {
            if(err.kind === "no found"){
                res.status(404).send({
                    message: `Error ${req.params.iduser}`,
                });
            } else {
                res.status(500).send({
                    mmessage: 'error update' + req.params.iduser,
                });
            } 
        } else res.send(data);
    });
};

exports.deleteUser = (req, res) => {
    User.findById(req.params.iduser, (err, user) =>{
        if(err){
            if(err.kind === 'not found'){
                res.status(404).send({
                    message: `Not found ${req.params.iduser}`,
                });
            } else{
                res.status(500).send({
                    message: 'error' + req.params.iduser,
                });
            }
        } else{
            User.remove(req.params.iduser, (err, data) =>{
                res.send({message: `User delete`});
            });
        }

    });
};

exports.deleteAllUsers = (req, res) => {
    User.removeAll((err, data) =>{
        if(err)
        res.status(500).send({
            message: err.message        
        });
        else res.send({ message: `success delete`})
    });
};