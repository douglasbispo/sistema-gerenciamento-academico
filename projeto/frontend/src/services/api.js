import { toast } from 'react-toastify';
import axios from 'axios';

// Cria uma instância do axios para usar em toda a aplicação
const api = axios.create({
    baseURL: 'http://localhost:5000/api' // URL base da API
});

// Variável de controle para evitar toasts duplicados
let showing401 = false;

// Interceptor de respostas para capturar erros globais
api.interceptors.response.use(
    (response) => response, // Se der certo, retorna a resposta normalmente
    (error) => {
        // Se o erro for de autenticação (401)
        if (error.response && error.response.status === 401) {
            // Exibe o toast apenas se ainda não estiver sendo mostrado
            if (!showing401) {
                showing401 = true;
                toast.error('Sua sessão expirou. Faça login novamente.');
                // Libera novamente após 3 segundos para não duplicar mensagens
                setTimeout(() => showing401 = false, 1000);
            }
        }
        // Retorna o erro para que o componente possa tratá-lo se necessário
        return Promise.reject(error);
    }
);

export default api; // Exporta a instância configurada
