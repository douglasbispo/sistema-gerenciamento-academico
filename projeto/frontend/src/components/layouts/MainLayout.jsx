import React from 'react';

const MainLayout = ({ children, onNavigate }) => {
    return (
        <div style={{ display: 'flex' }}>
            <nav style={{ width: '200px', height: '100vh', backgroundColor: '#f0f0f0', padding: '20px' }}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '10px' }}>
                        <button onClick={() => onNavigate('alunos')} style={{ width: '100%', textAlign: 'left', padding: '10px' }}>
                            Gerenciar Alunos
                        </button>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <button onClick={() => onNavigate('disciplinas')} style={{ width: '100%', textAlign: 'left', padding: '10px' }}>
                            Gerenciar Disciplinas
                        </button>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <button onClick={() => onNavigate('gerenciar')} style={{ width: '100%', textAlign: 'left', padding: '10px' }}>
                            Alocar Disciplinas
                        </button>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <button onClick={() => onNavigate('consultar')} style={{ width: '100%', textAlign: 'left', padding: '10px' }}>
                            Consultar Disciplinas
                        </button>
                    </li>
                </ul>
            </nav>
            <main style={{ flex: 1, padding: '20px' }}>
                {children}
            </main>
        </div>
    );
};

export default MainLayout;