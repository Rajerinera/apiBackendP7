const express = require('express');
const router = express.Router();

//const userCtrl = require('../controllers/users');
const auth = require('../middleware/auth');
const users = require('../controllers/user');


router.get('/user/:iduser', auth, users.findUser);
router.get('/users', auth, users.findAllusers);
router.get('/user/:iduser', auth, users.updateUser);
router.delete('/user/:userId', auth, users.deleteUser);
router.delete('/users', auth, users.deleteAllUsers);

module.exports = router;