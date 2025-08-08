import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import AlunoForm from './AlunoForm';
import './Aluno.css';

const AlunoList = ({ onNavigateToAlunoDetails }) => {
    const [alunos, setAlunos] = useState([]);
    const [editingAluno, setEditingAluno] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchAlunos = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Sua sessão expirou. Faça login novamente.');
            return;
        }
        
        try {
            const config = { headers: {Authorization: `Bearer ${token}`} };
            
            const response = await api.get('http://localhost:5000/api/alunos', config);
            setAlunos(response.data);
        } catch (error) {
            if (error.response && error.response.status !== 401) {
                toast.error('Erro ao buscar alunos.');
            }
            console.error('Erro ao buscar alunos:', error);
        }
    };

    useEffect(() => {
        fetchAlunos();
    }, [showForm]);

    const handleSaveSuccess = () => {
        setShowForm(false);
        setEditingAluno(null);
        fetchAlunos();
    };

    const handleEditClick = (aluno) => {
        setEditingAluno(aluno);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Sua sessão expirou. Faça login novamente.');
                return;
            }

            try {
                const config = { headers: {Authorization: `Bearer ${token}`} };

                await api.delete(`http://localhost:5000/api/alunos/${id}`, config);

                toast.success('Aluno excluído com sucesso!');
                fetchAlunos(); // Recarrega a lista após a exclusão
            } catch (error) {
                if (error.response && error.response.status !== 401) {
                    toast.error('Erro ao deletar aluno.');
                }
                console.error('Erro ao deletar aluno:', error);
            }
        }
    };

    if (showForm) {
        return (
            <div className="aluno-list">
                <h2>{editingAluno ? 'Editar Aluno' : 'Adicionar Novo Aluno'}</h2>
                <AlunoForm
                    aluno={editingAluno}
                    onSaveSuccess={handleSaveSuccess}
                    onCancel={() => { setEditingAluno(null); setShowForm(false); }}
                />
            </div>
        );
    }

    return (
        <div className="aluno-list">
            <h2>Lista de Alunos</h2>
            <button onClick={() => setShowForm(true)} className="add-button">Adicionar Aluno</button>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Matrícula</th>
                        <th>CPF</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {alunos.map(aluno => (
                        <tr key={aluno._id}>
                            <td data-label="Nome">
                                <button
                                    className="link-button"
                                    onClick={() => onNavigateToAlunoDetails('aluno-detalhes', aluno._id)}>
                                    {aluno.nome}
                                </button>
                            </td>
                            <td data-label="Matrícula">{aluno.matricula}</td>
                            <td data-label="CPF">{aluno.cpf}</td>
                            <td data-label="Ações">
                                <button onClick={() => handleEditClick(aluno)} className="edit-button">Editar</button>
                                <button onClick={() => handleDelete(aluno._id)} className="delete-button">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AlunoList;