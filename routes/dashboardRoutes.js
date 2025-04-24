const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({
    message: `Bem-vindo ao painel, ${req.user.nome}`,
    user: req.user
  });
});

module.exports = router;
