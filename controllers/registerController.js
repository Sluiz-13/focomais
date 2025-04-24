const bcrypt = require('bcryptjs');
const pool = require('../db');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se todos os campos foram enviados
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insere o usuário no banco
    await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)',
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    if (error.code === '23505') {
      // Erro de duplicidade (email já existe)
      res.status(409).json({ error: 'E-mail já está em uso' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  }
};
