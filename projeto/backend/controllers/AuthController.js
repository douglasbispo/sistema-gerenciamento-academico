 
const Aluno = require('../models/Aluno');

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const aluno = await Aluno.findOne({ email });

        if (aluno && (await aluno.matchPassword(senha))) {
            // Login bem-sucedido
            res.status(200).json({
                message: 'Login bem-sucedido',
                aluno: {
                    id: aluno._id,
                    nome: aluno.nome,
                    email: aluno.email,
                    matricula: aluno.matricula
                }
            });
        } else {
            // Credenciais inválidas
            res.status(401).json({ message: 'Email ou senha inválidos' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};