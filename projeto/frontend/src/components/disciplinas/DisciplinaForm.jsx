import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisciplinaForm = ({ disciplina, onSaveSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        nome: '',
        cargaHoraria: ''
    });

    useEffect(() => {
        if (disciplina) {
            setFormData({
                nome: disciplina.nome,
                cargaHoraria: disciplina.cargaHoraria
            });
        } else {
            setFormData({
                nome: '',
                cargaHoraria: ''
            });
        }
    }, [disciplina]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (disciplina) {
                // Requisição PUT para editar
                await axios.put(`http://localhost:5000/api/disciplinas/${disciplina._id}`, formData);
            } else {
                // Requisição POST para criar
                await axios.post('http://localhost:5000/api/disciplinas', formData);
            }
            onSaveSuccess();
        } catch (error) {
            console.error('Erro ao salvar disciplina:', error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <input type="text" name="nome" placeholder="Nome da Disciplina" value={formData.nome} onChange={handleChange} required />
            <input type="number" name="cargaHoraria" placeholder="Carga Horária" value={formData.cargaHoraria} onChange={handleChange} required />
            <button type="submit">{disciplina ? 'Salvar Alterações' : 'Adicionar Disciplina'}</button>
            {disciplina && <button type="button" onClick={onCancel} style={{ backgroundColor: '#ddd' }}>Cancelar</button>}
        </form>
    );
};

export default DisciplinaForm;