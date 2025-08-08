const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/AlunoController');
const { protect, admin } = require('../middleware/authMiddleware');

// Rota para alunos comuns
router.route('/me').get(protect, alunoController.getAlunoMe);
router.route('/minhas-disciplinas').get(protect, alunoController.getDisciplinasDoAlunoLogado);

// Rota para administradores
router.route('/').get(protect, admin, alunoController.getAllAlunos);
router.route('/').post(protect, admin, alunoController.createAluno);
router.route('/:id').get(protect, admin, alunoController.getAlunoById);
router.route('/:id').put(protect, admin, alunoController.updateAluno);
router.route('/:id').delete(protect, admin, alunoController.deleteAluno);

module.exports = router;