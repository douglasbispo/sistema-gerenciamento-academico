import React, { useState } from 'react';
import Login from './components/login/Login';
import MainLayout from './components/layouts/MainLayout';
import Home from './components/layouts/Home';
import AlunoList from './components/alunos/AlunoList';
import DisciplinaList from './components/disciplinas/DisciplinaList';
import GerenciarDisciplinas from './components/disciplinas/GerenciarDisciplinas';
import ExibirDisciplinas from './components/disciplinas/ExibirDisciplinas';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('home');

    const handleLoginSuccess = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        setCurrentPage('home'); // Define a página inicial após o login
    };

    const handleNavigate = (page) => {
        setCurrentPage(page);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home />;
            case 'alunos':
                return <AlunoList />;
            case 'disciplinas':
                return <DisciplinaList />;
            case 'gerenciar':
                return <GerenciarDisciplinas />;
            case 'consultar':
                return <ExibirDisciplinas />;
            default:
                return <Home />;
        }
    };

    if (!isLoggedIn) {
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <MainLayout onNavigate={handleNavigate}>
            {renderPage()}
        </MainLayout>
    );
}

export default App;