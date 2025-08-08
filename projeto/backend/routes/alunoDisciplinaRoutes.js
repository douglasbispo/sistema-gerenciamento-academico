const express = require('express');
const router = express.Router();
const alunoDisciplinaController = require('../controllers/AlunoDisciplinaController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/alocar', protect, admin, alunoDisciplinaController.alocarDisciplina);
router.post('/desalocar', protect, admin, alunoDisciplinaController.desalocarDisciplina);
router.get('/:matricula', protect, alunoDisciplinaController.getDisciplinasDoAluno);

module.exports = router;