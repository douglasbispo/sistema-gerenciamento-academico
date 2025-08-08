const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/AtividadeWeb2', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB conectado com sucesso!');
    } catch (error) {
        console.error('Erro na conexão com o MongoDB:', error.message);
        process.exit(1); // Encerra o processo em caso de erro
    }
};

module.exports = connectDB;