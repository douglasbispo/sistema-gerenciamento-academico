import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import './GerenciamentoDisciplinas.css';

const ExibirDisciplinas = () => {
    const [matricula, setMatricula] = useState('');
    const [disciplinas, setDisciplinas] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisciplinas([]);

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Sua sessão expirou. Faça login novamente.');
            return;
        }

        if (!matricula) {
            toast.info('Por favor, digite a matrícula do aluno.');
            return;
        }

        try {
            const config = { headers: {Authorization: `Bearer ${token}`} };

            const response = await api.get(`http://localhost:5000/api/aluno-disciplina/${matricula}`, config);
            
            if (response.data.length > 0) {
                setDisciplinas(response.data);
                /* toast.success('Disciplinas encontradas com sucesso!'); */
            } else {
                toast.info('Nenhuma disciplina encontrada para esta matrícula.');
            }
        } catch (error) {
            if (error.response && error.response.status !== 401) {
                toast.error(error.response?.data?.message || 'Erro ao buscar disciplinas. Verifique a matrícula.');
            }
            console.error('Erro ao buscar disciplinas:', error);

        }
    };

    return (
        <div className="consulta-container">
            <h2>Consultar Disciplinas por Matrícula</h2>
            <form onSubmit={handleSubmit} className="consulta-form">
                <input
                    type="text"
                    placeholder="Digite a matrícula do aluno"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>

            {disciplinas.length > 0 && (
                <div>
                    <h3>Disciplinas Encontradas:</h3>
                    <ul className="disciplinas-encontradas-list">
                        {disciplinas.map(item => (
                            <li key={item._id}>{item.disciplina.nome} ({item.disciplina.cargaHoraria}h)</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ExibirDisciplinas;