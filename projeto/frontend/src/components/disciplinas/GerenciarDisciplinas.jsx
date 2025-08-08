import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import './GerenciamentoDisciplinas.css';

const GerenciarDisciplinas = () => {
    const [alunos, setAlunos] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [selectedAluno, setSelectedAluno] = useState('');
    const [selectedDisciplina, setSelectedDisciplina] = useState('');
    const [alocadas, setAlocadas] = useState([]);

    const fetchAlunosDisciplinas = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Sua sessão expirou. Faça login novamente.');
            return;
        }

        try {
            const config = { headers: {Authorization: `Bearer ${token}`} };

            const alunosRes = await api.get('http://localhost:5000/api/alunos', config);
            const disciplinasRes = await api.get('http://localhost:5000/api/disciplinas', config);
            setAlunos(alunosRes.data);
            setDisciplinas(disciplinasRes.data);
        } catch (error) {
            if (error.response && error.response.status !== 401) {
                toast.error('Erro ao buscar disciplinas.');
            }
            console.error('Erro ao buscar dados:', error);
        }
    };

    const fetchDisciplinasAlocadas = async () => {
        if (!selectedAluno) return;
        const aluno = alunos.find(a => a._id === selectedAluno);
        if (!aluno) return;

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Sua sessão expirou. Faça login novamente.');
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const response = await api.get(`http://localhost:5000/api/aluno-disciplina/${aluno.matricula}`, config);
            setAlocadas(response.data);
        } catch (error) {
            if (error.response && error.response.status !== 401) {
                toast.error('Erro ao buscar disciplinas alocadas.');
            }
            console.error('Erro ao buscar disciplinas alocadas:', error);
        }
    };
    
    useEffect(() => {
        fetchAlunosDisciplinas();
    }, []);

    useEffect(() => {
        if (selectedAluno) {
            fetchDisciplinasAlocadas();
        } else {
            setAlocadas([]); // Limpa a lista se nenhum aluno estiver selecionado
        }
    }, [selectedAluno]);

    const handleAlocar = async () => {
        if (!selectedAluno || !selectedDisciplina) {
            toast.info('Selecione um aluno e uma disciplina.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) return;

        
        try {
            const config = { headers: {Authorization: `Bearer ${token}`} };
            
            await api.post('http://localhost:5000/api/aluno-disciplina/alocar', {
                alunoId: selectedAluno,
                disciplinaId: selectedDisciplina
            }, config);

            toast.success('Disciplina alocada com sucesso!');
            fetchDisciplinasAlocadas(); // Atualiza a lista
        } catch (error) {
            if (error.response && error.response.status !== 401) {
                toast.error(error.response?.data?.message || 'Erro ao alocar disciplina.');
            }
            console.error('Erro ao alocar disciplina:', error);
        }
    };

    const handleDesalocar = async (disciplinaId) => {
        if (!selectedAluno) {
            toast.error('Selecione um aluno.');
            return;
        }
        if (window.confirm('Tem certeza que deseja desalocar esta disciplina?')) {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const config = { headers: {Authorization: `Bearer ${token}`} };
                
                await api.post('http://localhost:5000/api/aluno-disciplina/desalocar', {
                    alunoId: selectedAluno,
                    disciplinaId: disciplinaId
                }, config);

                toast.success('Disciplina desalocada com sucesso!');
                fetchDisciplinasAlocadas(); // Atualiza a lista
            } catch (error) {
                if (error.response && error.response.status !== 401) {
                    toast.error(error.response?.data?.message || 'Erro ao desalocar disciplina.');
                }
                console.error('Erro ao desalocar disciplina:', error);
            }
        }
    };

    return (
        <div className="gerenciamento-disciplinas-container">
            <h2>Gerenciar Disciplinas dos Alunos</h2>
            <div className="form-gerenciamento">
                <select value={selectedAluno} onChange={e => setSelectedAluno(e.target.value)}>
                    <option value="">Selecione um Aluno</option>
                    {alunos.map(aluno => (
                        <option key={aluno._id} value={aluno._id}>{aluno.nome}</option>
                    ))}
                </select>
                <select value={selectedDisciplina} onChange={e => setSelectedDisciplina(e.target.value)}>
                    <option value="">Selecione uma Disciplina</option>
                    {disciplinas.map(disciplina => (
                        <option key={disciplina._id} value={disciplina._id}>{disciplina.nome}</option>
                    ))}
                </select>
                <button onClick={handleAlocar} className="alocar-button">Alocar Disciplina</button>
            </div>
            
            <h3>Disciplinas Alocadas</h3>
            {selectedAluno ? (
                alocadas.length > 0 ? (
                    <ul className="disciplinas-alocadas-list">
                        {alocadas.map(item => (
                            <li key={item._id}>
                                <span>{item.disciplina.nome}</span>
                                <button onClick={() => handleDesalocar(item.disciplina._id)} className="desalocar-button">Desalocar</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhuma disciplina alocada para este aluno.</p>
                )
            ) : (
                <p>Selecione um aluno para ver as disciplinas alocadas.</p>
            )}
        </div>
    );
};

export default GerenciarDisciplinas;