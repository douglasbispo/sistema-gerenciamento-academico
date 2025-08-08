import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlunoForm = ({ aluno, onSaveSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        nome: '',
        endereco: '',
        dataNascimento: '',
        cpf: '',
        matricula: '',
        telefone: '',
        email: '',
        curso: '',
        senha: ''
    });

    useEffect(() => {
        if (aluno) {
            setFormData({
                nome: aluno.nome,
                endereco: aluno.endereco,
                dataNascimento: aluno.dataNascimento.substring(0, 10), // Formata a data para o input
                cpf: aluno.cpf,
                matricula: aluno.matricula,
                telefone: aluno.telefone,
                email: aluno.email,
                curso: aluno.curso,
                senha: '' // A senha não é exibida para edição por segurança
            });
        } else {
            setFormData({
                nome: '',
                endereco: '',
                dataNascimento: '',
                cpf: '',
                matricula: '',
                telefone: '',
                email: '',
                curso: '',
                senha: ''
            });
        }
    }, [aluno]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (aluno) {
                // Requisição PUT para editar
                await axios.put(`http://localhost:5000/api/alunos/${aluno._id}`, formData);
            } else {
                // Requisição POST para criar
                await axios.post('http://localhost:5000/api/alunos', formData);
            }
            onSaveSuccess();
        } catch (error) {
            console.error('Erro ao salvar aluno:', error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
            <input type="text" name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} required />
            <input type="date" name="dataNascimento" placeholder="Data de Nascimento" value={formData.dataNascimento} onChange={handleChange} required />
            <input type="text" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} required />
            <input type="text" name="matricula" placeholder="Matrícula" value={formData.matricula} onChange={handleChange} required />
            <input type="text" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="text" name="curso" placeholder="Curso" value={formData.curso} onChange={handleChange} required />
            <input type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} required={!aluno} />
            <button type="submit" style={{ gridColumn: 'span 2' }}>{aluno ? 'Salvar Alterações' : 'Adicionar Aluno'}</button>
            {aluno && <button type="button" onClick={onCancel} style={{ gridColumn: 'span 2', backgroundColor: '#ddd' }}>Cancelar</button>}
        </form>
    );
};

export default AlunoForm;