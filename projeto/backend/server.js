require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes/router');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar ao banco de dados
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Arquivo principal de rotas
app.use('/api', routes);

// Rota teste para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('API do Projeto está rodando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});