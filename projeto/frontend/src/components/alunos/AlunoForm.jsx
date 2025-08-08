import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import './Aluno.css';

const validationSchema = Yup.object({
    nome: Yup.string().required('Nome é obrigatório.'),
    endereco: Yup.string().required('Endereço é obrigatório.'),
    dataNascimento: Yup.date().required('Data de Nascimento é obrigatória.').nullable(),
    cpf: Yup.string().required('CPF é obrigatório.').matches(/^\d{11}$/, 'CPF deve ter 11 dígitos.'),
    matricula: Yup.string().required('Matrícula é obrigatória.'),
    telefone: Yup.string().required('Telefone é obrigatório.'),
    email: Yup.string().email('Email inválido.').required('Email é obrigatório.'),
    curso: Yup.string().required('Curso é obrigatório.'),
    senha: Yup.string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres.')
        .when('$isNew', {
            is: (isNew) => isNew,
            then: (schema) => schema.required('A senha é obrigatória.'),
        }),
});

const AlunoForm = ({ aluno, onSaveSuccess, onCancel }) => {

    const formik = useFormik({
        initialValues: {
            nome: '',
            endereco: '',
            dataNascimento: '',
            cpf: '',
            matricula: '',
            telefone: '',
            email: '',
            curso: '',
            senha: '',
        },
        validationSchema,
        /* validationContext: { isNew: !aluno }, */
        context: { isNew: !aluno },
        onSubmit: async (values) => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Sua sessão expirou. Faça login novamente.');
                return;
            }

            try {
                const config = { headers: {Authorization: `Bearer ${token}`} };

                if (aluno) {
                    await api.put(`http://localhost:5000/api/alunos/${aluno._id}`, values, config);

                    toast.success('Aluno editado com sucesso!');
                } else {
                    await api.post('http://localhost:5000/api/alunos', values, config);

                    toast.success('Aluno adicionado com sucesso!');
                }
                
                onSaveSuccess();
            } catch (error) {
                if (error.response && error.response.status !== 401) {
                    toast.error(error.response?.data?.message || 'Erro ao salvar aluno.');
                }
                console.error('Erro ao salvar aluno:', error);
            }
        },
    });

    useEffect(() => {
        if (aluno) {
            formik.setValues({
                nome: aluno.nome,
                endereco: aluno.endereco,
                dataNascimento: aluno.dataNascimento.substring(0, 10),
                cpf: aluno.cpf,
                matricula: aluno.matricula,
                telefone: aluno.telefone,
                email: aluno.email,
                curso: aluno.curso,
                senha: '',
            });
        }
    }, [aluno]);

    return (
        <form onSubmit={formik.handleSubmit} className="aluno-form">
            {['nome', 'endereco', 'dataNascimento', 'cpf', 'matricula', 'telefone', 'email', 'curso'].map((name) => (
                <div key={name}>
                    <input
                        type={name === 'dataNascimento' ? 'date' : 'text'}
                        name={name}
                        placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                        value={formik.values[name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched[name] && formik.errors[name] ? (
                        <div className="error-message">{formik.errors[name]}</div>
                    ) : null}
                </div>
            ))}
            <div>
                <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    value={formik.values.senha}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required={!aluno}
                />
                {formik.touched.senha && formik.errors.senha ? (
                    <div className="error-message">{formik.errors.senha}</div>
                ) : null}
            </div>
            <button type="submit" disabled={formik.isSubmitting}>{aluno ? 'Salvar Alterações' : 'Adicionar Aluno'}</button>
            <button type="button" onClick={onCancel} className="cancel-button">Cancelar</button>
            {/* {aluno && <button type="button" onClick={onCancel} className="cancel-button">Cancelar</button>} */}
        </form>
    );
};

export default AlunoForm;