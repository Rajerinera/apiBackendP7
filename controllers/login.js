const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dbconnection = require('../connexionBDD/connect')

 
exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400)
        }
        const hash = await bcrypt.hash(req.body.password, 10); 

        await dbconnection.execute(
            "INSERT INTO `user`(`email`,`password`) VALUES(?,?)",
            [req.body.email, hash,]
        );
        res.status(200).json("good");
        console.log(res)
    } catch (error) {
        if (error) {
            res.status(500).send("problème")
        }
    }
}

exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            res.status.json("wrong login");
        }
        const user = await db('user').first('*').where({ email: email });
        if (user) {
            const valid = await bcrypt.compare(password, user.password);
            if (valid) {
                const token = jwt.sign({ iduser: user.iduser },
                    "TOKEN", {
                    expiresIn: "24h"
                });
                res.status(200).json({ iduser: user.iduser, token: token })
            } else {
                res.status(401).json('wrong');
            }
        } else {
            res.status(404).json('user not found');
        } 
    } catch(e){
        res.status(400).json("something wrong")
    } 
}