const jwt = require('jsonwebtoken');

// A chave secreta será carregada do arquivo .env
const jwtSecret = process.env.JWT_SECRET;

// Middleware para verificar se o token é válido e o usuário está logado
exports.protect = (req, res, next) => {
    let token;

    // Token que vem no cabeçalho 'Authorization'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            
            // Verificar e decodificar o token
            const decoded = jwt.verify(token, jwtSecret);

            // Adiciona o usuário na requisição
            req.user = decoded; 
            next();
        } catch (error) {
            res.status(401).json({ message: 'Não autorizado, token inválido.' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Não autorizado, nenhum token fornecido.' });
    }
};

// Middleware para restringir acesso apenas a administradores
exports.admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Acesso negado, necessário privilégio de administrador.' });
    }
};

// Middleware para restringir acesso apenas a alunos (opcional, dependendo da rota)
exports.aluno = (req, res, next) => {
    if (req.user && req.user.role === 'aluno') {
        next();
    } else {
        res.status(403).json({ message: 'Acesso negado, necessário privilégio de aluno.' });
    }
};