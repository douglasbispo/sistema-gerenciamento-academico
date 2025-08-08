import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-card">
                <h2>Bem-vindo(a) ao Sistema de Gerenciamento Acadêmico</h2>
                <p className="subtitle">Sua plataforma para gerenciar e acessar informações acadêmicas de forma fácil e rápida.</p>
                <p>
                    Utilize o menu de navegação ao lado para explorar as funcionalidades do sistema, seja para gerenciar dados, consultar suas informações pessoais ou visualizar as disciplinas disponíveis.
                </p>
                <p>
                    Nossa plataforma foi desenvolvida para otimizar a sua experiência, garantindo acesso seguro e eficiente a todos os recursos.
                </p>
            </div>
        </div>
    );
};

export default Home;