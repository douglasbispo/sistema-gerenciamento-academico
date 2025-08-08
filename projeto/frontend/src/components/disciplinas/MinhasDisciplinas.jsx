import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import './MinhasDisciplinas.css';

const MinhasDisciplinas = () => {
    const [disciplinas, setDisciplinas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMinhasDisciplinas = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Sua sessão expirou. Faça login novamente.');
                setLoading(false);
                return;
            }

            try {
                const config = { headers: {Authorization: `Bearer ${token}`} };

                const response = await api.get('http://localhost:5000/api/alunos/minhas-disciplinas', config);
                setDisciplinas(response.data);
                setLoading(false);
            } catch (err) {
                if (err.response && err.response.status !== 401) { 
                    toast.error(err.response?.data?.message || 'Não foi possível carregar suas disciplinas.');
                }
                console.error('Erro ao buscar disciplinas:', err);
                setLoading(false);
            }
        };

        fetchMinhasDisciplinas();
    }, []);

    if (loading) return <p>Nenhuma disciplina encontrada.</p>;
    if (disciplinas.length === 0) return <p>Você não tem nenhuma disciplina alocada.</p>;

    return (
        <div className="minhas-disciplinas-container">
            <h2>Minhas Disciplinas</h2>
            <ul className="disciplinas-list">
                {disciplinas.map(item => (
                    <li key={item._id} className="disciplina-item">
                        <strong>{item.disciplina.nome}</strong> - Carga Horária: {item.disciplina.cargaHoraria}h
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MinhasDisciplinas;