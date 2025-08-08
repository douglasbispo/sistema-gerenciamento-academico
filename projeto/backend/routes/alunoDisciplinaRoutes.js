const express = require('express');
const router = express.Router();
const alunoDisciplinaController = require('../controllers/AlunoDisciplinaController');

router.post('/alocar', alunoDisciplinaController.alocarDisciplina);
router.post('/desalocar', alunoDisciplinaController.desalocarDisciplina);
router.get('/:matricula', alunoDisciplinaController.getDisciplinasDoAluno);

module.exports = router;