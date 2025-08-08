const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
    email: { type: String, required: true,unique: true },
    senha: { type: String, required: true },
    role: { type: String, enum: ['aluno', 'admin'], default: 'aluno' }
});

// Pré-processamento antes de salvar o usuário
UsuarioSchema.pre('save', async function(next) {
    if (!this.isModified('senha')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
});

// Método para comparar a senha
UsuarioSchema.methods.matchPassword = async function(senhaDigitada) {
    return await bcrypt.compare(senhaDigitada, this.senha);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);