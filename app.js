const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');



const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes); // Rota de autenticação
app.use('/api', protectedRoutes); // Rota protegida



module.exports = app;
