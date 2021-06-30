const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const mysql = require('mysql2');

const db = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'Rajerinera11',
        database: 'groupomania',
    },
});

exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !mdp) {
            res.status(400)
        }
        const hash = await bcrypt.hash(req.body.mdp, 10);

        await db('user').insert({
            email: req.body.email,
            password: hash,
            name: req.body.name,
        });
        res.status(200).json(good);
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

        if (!email || !mdp) {
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
        res.status(400)
    }
}