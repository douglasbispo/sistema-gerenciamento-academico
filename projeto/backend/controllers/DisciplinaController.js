  
const Disciplina = require('../models/Disciplina');

exports.createDisciplina = async (req, res) => {
    try {
        const novaDisciplina = new Disciplina(req.body);
        await novaDisciplina.save();
        res.status(201).json(novaDisciplina);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllDisciplinas = async (req, res) => {
    try {
        const disciplinas = await Disciplina.find();
        res.status(200).json(disciplinas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDisciplinaById = async (req, res) => {
    try {
        const disciplina = await Disciplina.findById(req.params.id);
        if (!disciplina) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        res.status(200).json(disciplina);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateDisciplina = async (req, res) => {
    try {
        const disciplinaAtualizada = await Disciplina.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!disciplinaAtualizada) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        res.status(200).json(disciplinaAtualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteDisciplina = async (req, res) => {
    try {
        const disciplinaDeletada = await Disciplina.findByIdAndDelete(req.params.id);
        if (!disciplinaDeletada) {
            return res.status(404).json({ message: 'Disciplina não encontrada' });
        }
        res.status(200).json({ message: 'Disciplina deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};