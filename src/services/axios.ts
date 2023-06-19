import axios from 'axios';
import { store } from '@/services/store';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 5000,
});

// Ajoutez un intercepteur de demande
instance.interceptors.request.use(
    (config) => {
        const token = store.state.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Ajoutez un intercepteur de réponse
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 403 &&
            !originalRequest._retry &&
            originalRequest.url !== '/identity/refresh'
        ) {
            originalRequest._retry = true;

            // Appelez votre endpoint de rafraîchissement du token
            try {
                const refreshToken = store.state.refreshToken;
                const response = await axios.post('/identity/refresh', { "refreshToken": refreshToken });
                const newToken = response.data.token;
                const newRefreshToken = response.data.refreshToken;

                // Mettez à jour le store avec les nouveaux jetons
                store.commit('setToken', newToken);
                store.commit('setRefreshToken', newRefreshToken);

                // Réessayez la requête avec les nouveaux jetons
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                // Gérez les erreurs liées au rafraîchissement du jeton
                if (typeof refreshError === 'object' && refreshError !== null && 'message' in refreshError) {
                    console.log((refreshError as { message: string }).message);
                } else {
                    console.log('An error occurred while refreshing the token.');
                }
                store.commit('clearTokens');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default instance;