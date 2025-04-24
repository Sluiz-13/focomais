const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const fakeUser = {
  id: 1,
  name: 'Luiz Fernando',
  email: 'teste@focomais.com',
  password: bcrypt.hashSync('123456', 8)
};

exports.login = (req, res) => {
  const { email, senha } = req.body;

  if (email !== fakeUser.email || !bcrypt.compareSync(senha, fakeUser.password)) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = jwt.sign(
  {
    id: fakeUser.id,
    name: fakeUser.name,
    email: fakeUser.email
  },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

  return res.json({
    message: 'Login realizado com sucesso',
    token
  });
};
