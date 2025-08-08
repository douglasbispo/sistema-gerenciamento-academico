import React, { useState } from 'react';
import axios from 'axios';

const ExibirDisciplinas = () => {
    const [matricula, setMatricula] = useState('');
    const [disciplinas, setDisciplinas] = useState([]);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setDisciplinas([]);

        if (!matricula) {
            setMessage('Por favor, digite a matrícula do aluno.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/api/aluno-disciplina/${matricula}`);
            
            if (response.data.length > 0) {
                setDisciplinas(response.data);
            } else {
                setMessage('Nenhuma disciplina encontrada para esta matrícula.');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Erro ao buscar disciplinas. Verifique a matrícula.');
            console.error('Erro ao buscar disciplinas:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Consultar Disciplinas por Matrícula</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Digite a matrícula do aluno"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    style={{ marginRight: '10px', padding: '8px' }}
                    required
                />
                <button type="submit">Buscar</button>
            </form>

            {message && <p>{message}</p>}

            {disciplinas.length > 0 && (
                <div>
                    <h3>Disciplinas Encontradas:</h3>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
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