import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                senha
            });
            toast.success('Login bem-sucedido!');
            onLoginSuccess(response.data);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Erro ao fazer login. Tente novamente.');
            console.error('Erro de login:', err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        className="form-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <button type="submit" className="form-button">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;