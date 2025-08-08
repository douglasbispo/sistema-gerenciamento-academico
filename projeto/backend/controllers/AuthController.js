const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

// A chave secreta será armazenada em variáveis de ambiente em produção
const jwtSecret = process.env.JWT_SECRET;
console.log("AuthController - JWT_SECRET:", jwtSecret);

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if (usuario && (await usuario.matchPassword(senha))) {
            // Gerar o token JWT
            const token = jwt.sign(
                { id: usuario._id, role: usuario.role },
                jwtSecret,
                { expiresIn: '1h' }
            );

            // Login bem-sucedido, retorna o token e o papel do usuário
            res.status(200).json({
                message: 'Login bem-sucedido',
                token,
                role: usuario.role
            });
        } else {
            // Credenciais inválidas
            res.status(401).json({ message: 'Email ou senha inválidos' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};