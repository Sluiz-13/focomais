const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // importa a conexão com o banco

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos' });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.senha);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos' });
    }

    // Criando o token com nome, email e id do usuário
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email }, // Incluindo 'name' no payload
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login realizado com sucesso', token });
    console.log('Payload enviado no JWT:', {
      id: user.id,
      name: user.name,
      email: user.email
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no login' });
  }
};
