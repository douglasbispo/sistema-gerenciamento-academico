const mongoose = require('mongoose');

const DisciplinaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cargaHoraria: { type: Number, required: true }
});

module.exports = mongoose.model('Disciplina', DisciplinaSchema);