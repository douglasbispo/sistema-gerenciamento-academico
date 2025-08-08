import React, { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from './services/api';
import Login from './components/login/Login';
import MainLayout from './components/layouts/MainLayout';
import Home from './components/layouts/Home';
import AlunoList from './components/alunos/AlunoList';
import AlunoDetalhes from './components/alunos/AlunoDetalhes';
import AlunoForm from './components/alunos/AlunoForm';
import DisciplinaList from './components/disciplinas/DisciplinaList';
import GerenciarDisciplinas from './components/disciplinas/GerenciarDisciplinas';
import ExibirDisciplinas from './components/disciplinas/ExibirDisciplinas';
import MeusDados from './components/alunos/MeusDados';
import MinhasDisciplinas from './components/disciplinas/MinhasDisciplinas';

import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedAlunoId, setSelectedAlunoId] = useState(null);
    const [editingAluno, setEditingAluno] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('userRole');
        if (token && role) {
            setIsLoggedIn(true);
            setUser({ token, role });
        }
    }, []);

    const handleLoginSuccess = (userData) => {
        setIsLoggedIn(true);
        setUser({ token: userData.token, role: userData.role });
        setCurrentPage('home');
        localStorage.setItem('token', userData.token);
        localStorage.setItem('userRole', userData.role);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setCurrentPage('home');
    };

    const handleNavigate = (page, id = null) => {
        setCurrentPage(page);
        setSelectedAlunoId(id);
    };

    const handleEditClick = (aluno) => {
        setEditingAluno(aluno);
        setCurrentPage('editar-aluno');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const config = { headers: {Authorization: `Bearer ${token}`} };

                await api.delete(`http://localhost:5000/api/alunos/${id}`, config);

                toast.success("excluído com sucesso!")
                setCurrentPage('alunos');
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    toast.error('Erro ao deletar aluno.');
                }
                console.error('Erro ao deletar aluno:', error);
            }
        }
    };

    const handleSaveSuccess = () => {
        setEditingAluno(null);
        setCurrentPage('alunos');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home />;
            case 'alunos':
                return <AlunoList onNavigateToAlunoDetails={handleNavigate} />;
            case 'aluno-detalhes':
                return selectedAlunoId ? <AlunoDetalhes
                    alunoId={selectedAlunoId}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                    onNavigateToAlunoList={handleNavigate}
                /> : <p>ID do aluno não fornecido.</p>;
            case 'editar-aluno':
                return (
                    <div className="aluno-form-container">
                        <h2>Editar Aluno</h2>
                        <AlunoForm
                            aluno={editingAluno}
                            onSaveSuccess={handleSaveSuccess}
                            onCancel={() => handleNavigate('alunos')}
                        />
                    </div>
                );
            case 'disciplinas':
                return <DisciplinaList />;
            case 'gerenciar':
                return <GerenciarDisciplinas />;
            case 'consultar':
                return <ExibirDisciplinas />;
            case 'meus-dados':
                return <MeusDados />;
            case 'minhas-disciplinas':
                return <MinhasDisciplinas />;
            default:
                return <Home />;
        }
    };

    if (!isLoggedIn) {
        return (
            <>
                <ToastContainer />
                <Login onLoginSuccess={handleLoginSuccess} />  
            </>
        );
    }

    return (
        <>
            <ToastContainer />
            <MainLayout onNavigate={handleNavigate} onLogout={handleLogout} userRole={user.role}>
                {renderPage()}
            </MainLayout>
        </>
    );
}

export default App;