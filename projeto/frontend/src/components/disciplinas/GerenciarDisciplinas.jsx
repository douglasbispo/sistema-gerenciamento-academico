 import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GerenciarDisciplinas = () => {
    const [alunos, setAlunos] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [selectedAluno, setSelectedAluno] = useState('');
    const [selectedDisciplina, setSelectedDisciplina] = useState('');
    const [alocadas, setAlocadas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const alunosRes = await axios.get('http://localhost:5000/api/alunos');
                const disciplinasRes = await axios.get('http://localhost:5000/api/disciplinas');
                setAlunos(alunosRes.data);
                setDisciplinas(disciplinasRes.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
        fetchData();
    }, []);

    const fetchDisciplinasAlocadas = async () => {
        if (!selectedAluno) return;
        const aluno = alunos.find(a => a._id === selectedAluno);
        if (!aluno) return;
        try {
            const response = await axios.get(`http://localhost:5000/api/aluno-disciplina/${aluno.matricula}`);
            setAlocadas(response.data);
        } catch (error) {
            console.error('Erro ao buscar disciplinas alocadas:', error);
        }
    };

    useEffect(() => {
        fetchDisciplinasAlocadas();
    }, [selectedAluno]);

    const handleAlocar = async () => {
        if (!selectedAluno || !selectedDisciplina) {
            alert('Selecione um aluno e uma disciplina.');
            return;
        }
        try {
            await axios.post('http://localhost:5000/api/aluno-disciplina/alocar', {
                alunoId: selectedAluno,
                disciplinaId: selectedDisciplina
            });
            alert('Disciplina alocada com sucesso!');
            fetchDisciplinasAlocadas(); // Atualiza a lista
        } catch (error) {
            alert(error.response.data.message);
            console.error('Erro ao alocar disciplina:', error);
        }
    };

    const handleDesalocar = async (disciplinaId) => {
        if (!selectedAluno) {
            alert('Selecione um aluno.');
            return;
        }
        if (window.confirm('Tem certeza que deseja desalocar esta disciplina?')) {
            try {
                await axios.post('http://localhost:5000/api/aluno-disciplina/desalocar', {
                    alunoId: selectedAluno,
                    disciplinaId: disciplinaId
                });
                alert('Disciplina desalocada com sucesso!');
                fetchDisciplinasAlocadas(); // Atualiza a lista
            } catch (error) {
                alert(error.response.data.message);
                console.error('Erro ao desalocar disciplina:', error);
            }
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Gerenciar Disciplinas dos Alunos</h2>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <select value={selectedAluno} onChange={e => setSelectedAluno(e.target.value)} style={{ padding: '8px' }}>
                    <option value="">Selecione um Aluno</option>
                    {alunos.map(aluno => (
                        <option key={aluno._id} value={aluno._id}>{aluno.nome}</option>
                    ))}
                </select>
                <select value={selectedDisciplina} onChange={e => setSelectedDisciplina(e.target.value)} style={{ padding: '8px' }}>
                    <option value="">Selecione uma Disciplina</option>
                    {disciplinas.map(disciplina => (
                        <option key={disciplina._id} value={disciplina._id}>{disciplina.nome}</option>
                    ))}
                </select>
                <button onClick={handleAlocar}>Alocar Disciplina</button>
            </div>
            
            <h3>Disciplinas Alocadas</h3>
            {selectedAluno ? (
                alocadas.length > 0 ? (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {alocadas.map(item => (
                            <li key={item._id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span>{item.disciplina.nome}</span>
                                <button onClick={() => handleDesalocar(item.disciplina._id)}>Desalocar</button>
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