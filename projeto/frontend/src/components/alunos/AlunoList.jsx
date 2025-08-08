import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlunoForm from './AlunoForm';

const AlunoList = () => {
    const [alunos, setAlunos] = useState([]);
    const [editingAluno, setEditingAluno] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchAlunos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/alunos');
            setAlunos(response.data);
        } catch (error) {
            console.error('Erro ao buscar alunos:', error);
        }
    };

    useEffect(() => {
        fetchAlunos();
    }, []);

    const handleSaveSuccess = () => {
        setShowForm(false);
        setEditingAluno(null);
        fetchAlunos(); // Atualiza a lista após salvar
    };

    const handleEditClick = (aluno) => {
        setEditingAluno(aluno);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
            try {
                await axios.delete(`http://localhost:5000/api/alunos/${id}`);
                fetchAlunos(); // Atualiza a lista após excluir
            } catch (error) {
                console.error('Erro ao deletar aluno:', error);
            }
        }
    };

    if (showForm) {
        return (
            <div style={{ padding: '20px' }}>
                <h2>{editingAluno ? 'Editar Aluno' : 'Adicionar Novo Aluno'}</h2>
                <AlunoForm 
                    aluno={editingAluno} 
                    onSaveSuccess={handleSaveSuccess} 
                    onCancel={() => setShowForm(false)} 
                />
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Lista de Alunos</h2>
            <button onClick={() => setShowForm(true)} style={{ marginBottom: '20px' }}>Adicionar Aluno</button>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nome</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Matrícula</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {alunos.map(aluno => (
                        <tr key={aluno._id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{aluno.nome}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{aluno.matricula}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{aluno.email}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                <button onClick={() => handleEditClick(aluno)} style={{ marginRight: '10px' }}>Editar</button>
                                <button onClick={() => handleDelete(aluno._id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AlunoList;