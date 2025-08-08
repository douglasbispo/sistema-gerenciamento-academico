const express = require('express');
const router = express.Router();

// Importar as rotas individuais
const alunoRoutes = require('./alunoRoutes');
const disciplinaRoutes = require('./disciplinaRoutes');
const alunoDisciplinaRoutes = require('./alunoDisciplinaRoutes');
const authRoutes = require('./authRoutes');

// Agrupar as rotas usando o router principal
router.use('/alunos', alunoRoutes);
router.use('/disciplinas', disciplinaRoutes);
router.use('/aluno-disciplina', alunoDisciplinaRoutes);
router.use('/auth', authRoutes);

module.exports = router;