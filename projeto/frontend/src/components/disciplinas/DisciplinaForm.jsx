import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import './Disciplina.css';

// Esquema de validação com o Yup para a disciplina
const validationSchema = Yup.object({
    nome: Yup.string().required('Nome da disciplina é obrigatório.'),
    cargaHoraria: Yup.number()
        .required('Carga horária é obrigatória.')
        .positive('A carga horária deve ser um número positivo.')
        .integer('A carga horária deve ser um número inteiro.'),
});

const DisciplinaForm = ({ disciplina, onSaveSuccess, onCancel }) => {

    const formik = useFormik({
        initialValues: {
            nome: '',
            cargaHoraria: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Sua sessão expirou. Faça login novamente.');
                return;
            }
            
            try {
                const config = { headers: {Authorization: `Bearer ${token}`} };

                if (disciplina) {
                    await api.put(`http://localhost:5000/api/disciplinas/${disciplina._id}`, values, config);
                    
                    toast.success('Disciplina editada com sucesso!');
                } else {
                    await api.post('http://localhost:5000/api/disciplinas', values, config);

                    toast.success('Disciplina adicionada com sucesso!');
                }

                onSaveSuccess();
            } catch (error) {
                if (error.response && error.response.status !== 401) {
                    toast.error(error.response?.data?.message || 'Erro ao salvar disciplina.');
                }
                console.error('Erro ao salvar disciplina:', error);
            }
        },
    });

    useEffect(() => {
        if (disciplina) {
            formik.setValues({
                nome: disciplina.nome,
                cargaHoraria: disciplina.cargaHoraria,
            });
        }
    }, [disciplina]);

    return (
        <form onSubmit={formik.handleSubmit} className="disciplina-form">
            <input
                type="text"
                name="nome"
                placeholder="Nome da Disciplina"
                value={formik.values.nome}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.nome && formik.errors.nome ? (
                <div className="error-message">{formik.errors.nome}</div>
            ) : null}

            <input
                type="number"
                name="cargaHoraria"
                placeholder="Carga Horária"
                value={formik.values.cargaHoraria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.cargaHoraria && formik.errors.cargaHoraria ? (
                <div className="error-message">{formik.errors.cargaHoraria}</div>
            ) : null}

            <button type="submit" disabled={formik.isSubmitting}>{disciplina ? 'Salvar Alterações' : 'Adicionar Disciplina'}</button>
            <button type="button" onClick={onCancel} className="cancel-button">Cancelar</button>
            {/* {disciplina && <button type="button" onClick={onCancel} className="cancel-button">Cancelar</button>} */}
        </form>
    );
};

export default DisciplinaForm;