import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import DisciplinaForm from './DisciplinaForm';
import './Disciplina.css';

const DisciplinaList = () => {
    const [disciplinas, setDisciplinas] = useState([]);
    const [editingDisciplina, setEditingDisciplina] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // Função que busca as disciplinas (já está com o token)
    const fetchDisciplinas = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Sua sessão expirou. Faça login novamente.');
            return;
        }

        try {
            const config = { headers: {Authorization: `Bearer ${token}`} };

            const response = await api.get('http://localhost:5000/api/disciplinas', config);
            setDisciplinas(response.data);
        } catch (error) {
            if (error.response && error.response.status !== 401) {
                toast.error('Erro ao buscar disciplinas.');
            }
            console.error('Erro ao buscar disciplinas:', error);
        }
    };

    useEffect(() => {
        fetchDisciplinas();
    }, [showForm]);

    const handleSaveSuccess = () => {
        setShowForm(false);
        setEditingDisciplina(null);
        fetchDisciplinas();
    };

    const handleEditClick = (disciplina) => {
        setEditingDisciplina(disciplina);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta disciplina?')) {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Sua sessão expirou. Faça login novamente.');
                return;
            }

            try {
                const config = { headers: {Authorization: `Bearer ${token}`} };

                await api.delete(`http://localhost:5000/api/disciplinas/${id}`, config);

                toast.success('Disciplina excluída com sucesso!');
                fetchDisciplinas(); // Recarrega a lista após a exclusão
            } catch (error) {
                if (error.response && error.response.status !== 401) {
                    toast.error('Erro ao deletar disciplina.');
                }
                console.error('Erro ao deletar disciplina:', error);
            }
        }
    };

    if (showForm) {
        return (
            <div className="disciplina-list">
                <h2>{editingDisciplina ? 'Editar Disciplina' : 'Adicionar Nova Disciplina'}</h2>
                <DisciplinaForm
                    disciplina={editingDisciplina}
                    onSaveSuccess={handleSaveSuccess}
                    onCancel={() => { setEditingDisciplina(null); setShowForm(false); }}
                />
            </div>
        );
    }

    return (
        <div className="disciplina-list">
            <h2>Lista de Disciplinas</h2>
            <button onClick={() => setShowForm(true)} className="add-button">Adicionar Disciplina</button>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Carga Horária</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {disciplinas.map(disciplina => (
                        <tr key={disciplina._id}>
                            <td data-label="Nome">{disciplina.nome}</td>
                            <td data-label="Carga Horária">{disciplina.cargaHoraria}h</td>
                            <td data-label="Ações">
                                <button onClick={() => handleEditClick(disciplina)} className="edit-button">Editar</button>
                                <button onClick={() => handleDelete(disciplina._id)} className="delete-button">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DisciplinaList;