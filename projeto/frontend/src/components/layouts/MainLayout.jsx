import React from 'react';
import './MainLayout.css';

const MainLayout = ({ children, onNavigate, onLogout, userRole }) => {
    return (
        <div className="main-layout">
            <nav className="sidebar">
                <ul className="nav-list">
                    {userRole === 'admin' && (
                        <>
                            <li><button onClick={() => onNavigate('alunos')}>Gerenciar Alunos</button></li>
                            <li><button onClick={() => onNavigate('disciplinas')}>Gerenciar Disciplinas</button></li>
                            <li><button onClick={() => onNavigate('gerenciar')}>Alocar Disciplinas</button></li>
                            <li><button onClick={() => onNavigate('consultar')}>Consultar Disciplinas</button></li>
                        </>
                    )}
                    {userRole === 'aluno' && (
                        <>
                            <li><button onClick={() => onNavigate('meus-dados')}>Visualizar meus Dados</button></li>
                            <li><button onClick={() => onNavigate('minhas-disciplinas')}>Minhas Disciplinas</button></li>
                        </>
                    )}
                    <li><button onClick={onLogout} className="logout-button">Sair</button></li>
                </ul>
            </nav>
            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;