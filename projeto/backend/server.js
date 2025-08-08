const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes/router'); // Importa o arquivo principal de rotas

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar ao banco de dados
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Usar o arquivo principal de rotas com o prefixo /api
app.use('/api', routes);

// Rota de teste para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('API do Projeto de Programação para Internet II está rodando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});