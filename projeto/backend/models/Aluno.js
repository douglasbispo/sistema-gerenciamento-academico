const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AlunoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    endereco: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    cpf: { type: String, required: true, unique: true },
    matricula: { type: String, required: true, unique: true },
    telefone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    curso: { type: String, required: true },
    senha: { type: String, required: true }
});

// Este middleware criptografa a senha antes de salvar o aluno
AlunoSchema.pre('save', async function(next) {
    if (!this.isModified('senha')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
});

// Método para comparar a senha fornecida com a senha criptografada
AlunoSchema.methods.matchPassword = async function(senhaDigitada) {
    return await bcrypt.compare(senhaDigitada, this.senha);
};

module.exports = mongoose.model('Aluno', AlunoSchema);