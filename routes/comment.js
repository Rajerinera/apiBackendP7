const express = require('express');
const router = express.Router();

const comments = require("../controllers/comment");

router.post('/commentaire',comments.create);
router.get('/commentaires', comment.findAllcomment);
router.get('/commentaire/:commentaireId', comments.findOneComment);
router.put('/commentaire/:commentaireId', comments.update);
router.delete('/commentaire/:commentaireId', comments.delete);
router.delete('/commentaires', comments.deleteAll);

module.exports = router;
