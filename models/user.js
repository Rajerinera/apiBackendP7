const mysql = require('mysql');
const connection = require("../connexionBDD/connect");

const userSchema = function(user){
    this.email = user.email;
    this.password = user.password;
    this.name = user.name;
    this.firstname = user.firstname;
};

userSchema.findById = (userId, result) => {
    connection.query(`SELECT * FROM user WHERE id = ${userId}`, (err, res) => {
        if(err){
            console.log("error", err);
            result(err, null);
            return;
        }

        if(res.length) {
            console.log('found user', res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "no found"}, null);
    });
};

userSchema.getAll = (result) => {
    connection.query("SELECT * FROM user", (err, res)=>{
        if(err) {
            console.log("error", err);
            result(null, err);
            return;
        }
        console.log('users', res);
        result(null, err);
    });
}

userSchema.updateById = (id, user, result) =>{
    connection.query(
        `UPDATE user SET name = ?, firstname = ?,`,
        [
            user.name,
            user.firstname,
            id,
        ],
        (err, res) =>{
            if(err) {
                console.log("error", err);
                result(null, err);
                return;
            }
            if(res.affectedRows == 0){
                result({kind: "not found"}, null);
                return;
            }

            console.log('update user', {id: id, ...user});
            result(null, {id: id, ...user});
        }
    );
};

userSchema.remove = (id, result) => {
    connection.query("DELETE FROM user WHERE id = ?", id, (err, res)=>{
        if (err) {
            console.log("error", err);
            result(null, err);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not found"}, null);
            return;
        }
        console.log("deleted", id);
        result(null, res);
    });
};

userSchema.removeAll = (result) =>{
    connection.query("DELETE FROM user", (err, res) =>{
        if(err){
            console.log("error", err);
            result(null, err);
            return;
        }
        console.log(`delete ${res.affectedRows} users`);
        result(null, res);
    });
};

module.exports = userSchema;