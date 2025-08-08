const mongoose = require('mongoose');

const AlunoDisciplinaSchema = new mongoose.Schema({
    aluno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aluno',
        required: true
    },
    disciplina: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disciplina',
        required: true
    }
});

AlunoDisciplinaSchema.index({ aluno: 1, disciplina: 1 }, { unique: true });

module.exports = mongoose.model('AlunoDisciplina', AlunoDisciplinaSchema);