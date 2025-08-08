import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import './MeusDados.css';

const MeusDados = () => {
    const [aluno, setAluno] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMeusDados = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Sua sessão expirou. Faça login novamente.');
                setLoading(false);
                return;
            }

            
            try {
                const config = { headers: {Authorization: `Bearer ${token}`} };
                
                const response = await api.get('http://localhost:5000/api/alunos/me', config);
                setAluno(response.data);
                setLoading(false);
            } catch (err) {
                if (err.response && err.response.status !== 401) { 
                    toast.error(err.response?.data?.message || 'Não foi possível carregar seus dados.');
                }
                console.error('Erro ao buscar dados do aluno:', err);
                setLoading(false);
            }
        };
        fetchMeusDados();
    }, []);

    if (loading) return <p>Carregando seus dados...</p>;
    if (!aluno) return <p>Nenhum dado de aluno encontrado.</p>;

    return (
        <div className="meus-dados-container">
            <h2>Meus Dados</h2>
            <div className="dados-card">
                <p><strong>Nome:</strong> {aluno.nome}</p>
                <p><strong>Matrícula:</strong> {aluno.matricula}</p>
                <p><strong>Email:</strong> {aluno.email}</p>
                <p><strong>CPF:</strong> {aluno.cpf}</p>
                <p><strong>Telefone:</strong> {aluno.telefone}</p>
                <p><strong>Curso:</strong> {aluno.curso}</p>
            </div>
        </div>
    );
};

export default MeusDados;