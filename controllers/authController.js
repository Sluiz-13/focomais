const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = (req, res) => {
  const { email, senha } = req.body;

  if (email !== User.email || !bcrypt.compareSync(senha, User.password)) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = jwt.sign(
  {
    id: User.id,
    name: User.name,
    email: User.email
  },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

  return res.json({
    message: 'Login realizado com sucesso',
    token
  });
};
