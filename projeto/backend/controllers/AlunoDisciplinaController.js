const Aluno = require('../models/Aluno');
const AlunoDisciplina = require('../models/AlunoDisciplina');

exports.alocarDisciplina = async (req, res) => {
    const { alunoId, disciplinaId } = req.body;
    try {
        const alocacao = new AlunoDisciplina({ aluno: alunoId, disciplina: disciplinaId });
        await alocacao.save();
        res.status(201).json(alocacao);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.desalocarDisciplina = async (req, res) => {
    const { alunoId, disciplinaId } = req.body;
    try {
        const resultado = await AlunoDisciplina.findOneAndDelete({ aluno: alunoId, disciplina: disciplinaId });
        if (!resultado) {
            return res.status(404).json({ message: 'Alocação não encontrada' });
        }
        res.status(200).json({ message: 'Disciplina desalocada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDisciplinasDoAluno = async (req, res) => {
    const { matricula } = req.params;
    try {
        const aluno = await Aluno.findOne({ matricula });
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        const disciplinasAlocadas = await AlunoDisciplina.find({ aluno: aluno._id }).populate('disciplina');
        res.status(200).json(disciplinasAlocadas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};