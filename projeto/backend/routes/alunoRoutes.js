const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/AlunoController');

router.post('/', alunoController.createAluno);
router.get('/', alunoController.getAllAlunos);
router.get('/:id', alunoController.getAlunoById);
router.put('/:id', alunoController.updateAluno);
router.delete('/:id', alunoController.deleteAluno);

module.exports = router;