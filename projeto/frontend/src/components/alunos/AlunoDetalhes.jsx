import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import './AlunoDetalhes.css';

const AlunoDetalhes = ({ alunoId, onEdit, onDelete, onNavigateToAlunoList }) => {
    const [aluno, setAluno] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlunoDetalhes = async () => {
            if (!alunoId) {
                toast.error('ID do aluno não fornecido.');
                setLoading(false);
                return;
            }

            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Sua sessão expirou. Faça login novamente.');
                setLoading(false);
                return;
            }

            try {
                const config = { headers: {Authorization: `Bearer ${token}`} };

                const response = await api.get(`http://localhost:5000/api/alunos/${alunoId}`, config);
                setAluno(response.data);
                setLoading(false);
            } catch (err) {
                if (err.response && err.response.status !== 401) {
                    toast.error(err.response?.data?.message || 'Não foi possível carregar os dados do aluno.');
                }
                console.error('Erro ao buscar dados do aluno:', err);
                setLoading(false);
            }
        };

        fetchAlunoDetalhes();
    }, [alunoId]);

    if (loading) return <p>Carregando os dados do aluno...</p>;
    if (!aluno) return <p>Nenhum dado de aluno encontrado.</p>;

    return (
        <div className="aluno-detalhes-container">
            <h2>Detalhes do Aluno</h2>
            <div className="detalhes-card">
                <p><strong>Nome:</strong> {aluno.nome}</p>
                <p><strong>Matrícula:</strong> {aluno.matricula}</p>
                <p><strong>Email:</strong> {aluno.email}</p>
                <p><strong>CPF:</strong> {aluno.cpf}</p>
                <p><strong>Endereço:</strong> {aluno.endereco}</p>
                <p><strong>Telefone:</strong> {aluno.telefone}</p>
                <p><strong>Curso:</strong> {aluno.curso}</p>
                <p><strong>Data de Nascimento:</strong> {new Date(aluno.dataNascimento).toLocaleDateString()}</p>
            </div>
            <div className="button-group">
                <button onClick={() => onNavigateToAlunoList('alunos')} className="back-button">Voltar</button>
                <button onClick={() => onEdit(aluno)} className="edit-button">Editar</button>
                <button onClick={() => onDelete(aluno._id)} className="delete-button">Excluir</button>
            </div>
        </div>
    );
};

export default AlunoDetalhes;