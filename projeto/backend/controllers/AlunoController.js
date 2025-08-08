  
const Aluno = require('../models/Aluno');
const Usuario = require('../models/Usuario');
const AlunoDisciplina = require('../models/AlunoDisciplina');

// Lógica de criação de aluno, incluindo a criação do usuário
exports.createAluno = async (req, res) => {
    const { nome, endereco, dataNascimento, cpf, matricula, telefone, email, curso, senha, role } = req.body;
    try {
        // Validação para email, CPF e matrícula duplicados
        const alunoExistente = await Aluno.findOne({ $or: [{ email }, { cpf }, { matricula }] });
        if (alunoExistente) {
            let message = '';
            if (alunoExistente.email === email && alunoExistente.cpf === cpf && alunoExistente.matricula === matricula) {
                message = 'Já existe um aluno com este email, CPF e matrícula.';
            } else if (alunoExistente.email === email) {
                message = 'Já existe um aluno com este email.';
            } else if (alunoExistente.cpf === cpf) {
                message = 'Já existe um aluno com este CPF.';
            } else {
                message = 'Já existe um aluno com esta matrícula.';
            }
            return res.status(400).json({ message });
        }
        
        // Cria o usuário
        const usuario = new Usuario({ email, senha, role });
        await usuario.save();
        
        // Cria o aluno
        const aluno = new Aluno({ nome, endereco, dataNascimento, cpf, matricula, telefone, email, curso });
        await aluno.save();

        res.status(201).json(aluno);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.find();
        res.status(200).json(alunos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAlunoById = async (req, res) => {
    try {
        const aluno = await Aluno.findById(req.params.id);
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAluno = async (req, res) => {
    try {
        const alunoAtualizado = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!alunoAtualizado) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.status(200).json(alunoAtualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAluno = async (req, res) => {
    try {
        const alunoDeletado = await Aluno.findByIdAndDelete(req.params.id);
        if (!alunoDeletado) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.status(200).json({ message: 'Aluno deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Funções do aluno
exports.getAlunoMe = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.user.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        const aluno = await Aluno.findOne({ email: usuario.email });

        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado.' });
        }

        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDisciplinasDoAlunoLogado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.user.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        const aluno = await Aluno.findOne({ email: usuario.email });
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado.' });
        }

        const disciplinas = await AlunoDisciplina.find({ aluno: aluno._id }).populate('disciplina');
        res.status(200).json(disciplinas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};