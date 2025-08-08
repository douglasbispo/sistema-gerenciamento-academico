import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisciplinaForm from './DisciplinaForm';

const DisciplinaList = () => {
    const [disciplinas, setDisciplinas] = useState([]);
    const [editingDisciplina, setEditingDisciplina] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchDisciplinas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/disciplinas');
            setDisciplinas(response.data);
        } catch (error) {
            console.error('Erro ao buscar disciplinas:', error);
        }
    };

    useEffect(() => {
        fetchDisciplinas();
    }, []);

    const handleSaveSuccess = () => {
        setShowForm(false);
        setEditingDisciplina(null);
        fetchDisciplinas(); // Atualiza a lista após salvar
    };

    const handleEditClick = (disciplina) => {
        setEditingDisciplina(disciplina);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta disciplina?')) {
            try {
                await axios.delete(`http://localhost:5000/api/disciplinas/${id}`);
                fetchDisciplinas(); // Atualiza a lista após excluir
            } catch (error) {
                console.error('Erro ao deletar disciplina:', error);
            }
        }
    };

    if (showForm) {
        return (
            <div style={{ padding: '20px' }}>
                <h2>{editingDisciplina ? 'Editar Disciplina' : 'Adicionar Nova Disciplina'}</h2>
                <DisciplinaForm 
                    disciplina={editingDisciplina} 
                    onSaveSuccess={handleSaveSuccess} 
                    onCancel={() => setShowForm(false)} 
                />
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Lista de Disciplinas</h2>
            <button onClick={() => setShowForm(true)} style={{ marginBottom: '20px' }}>Adicionar Disciplina</button>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nome</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Carga Horária</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {disciplinas.map(disciplina => (
                        <tr key={disciplina._id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{disciplina.nome}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{disciplina.cargaHoraria}h</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                <button onClick={() => handleEditClick(disciplina)} style={{ marginRight: '10px' }}>Editar</button>
                                <button onClick={() => handleDelete(disciplina._id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DisciplinaList;