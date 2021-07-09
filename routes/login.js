const express = require("express");
const router = express.Router();


//const verifyPassword = require("../middleware/pass");
const verifyEmail = require("../middleware/email");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, 
  max: 3, 
  message: "trop de requete abusive , vous devez attendre 3 minutes",
});

const log = require("../controllers/login");

router.post("/signup", verifyEmail, log.signup);
router.post("/login", limiter, log.login); 
 
module.exports = router;