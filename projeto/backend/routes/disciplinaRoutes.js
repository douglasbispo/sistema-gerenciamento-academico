const express = require('express');
const router = express.Router();
const disciplinaController = require('../controllers/DisciplinaController');
const { protect, admin } = require('../middleware/authMiddleware');

// Rotas de CRUD de disciplinas, restritas a administradores
router.route('/').get(protect, admin, disciplinaController.getAllDisciplinas);
router.route('/').post(protect, admin, disciplinaController.createDisciplina);
router.route('/:id').get(protect, admin, disciplinaController.getDisciplinaById);
router.route('/:id').put(protect, admin, disciplinaController.updateDisciplina);
router.route('/:id').delete(protect, admin, disciplinaController.deleteDisciplina);

module.exports = router;
