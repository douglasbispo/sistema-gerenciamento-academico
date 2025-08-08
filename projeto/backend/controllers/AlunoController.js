  
const Aluno = require('../models/Aluno');

exports.createAluno = async (req, res) => {
    try {
        const novoAluno = new Aluno(req.body);
        await novoAluno.save();
        res.status(201).json(novoAluno);
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