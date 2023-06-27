import axios from 'axios';
import {store} from '@/services/store';

export const identityAxios = axios.create({
    baseURL: process.env.VUE_APP_IDENTITY_URL,
    timeout: 5000,
});
export const bffAxios = axios.create({
    baseURL: process.env.VUE_APP_BFF_URL,
    timeout: 5000,
});

function addAuthorizationHeader(config: any) {
    const token = store.state.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}

identityAxios.interceptors.request.use(addAuthorizationHeader);
bffAxios.interceptors.request.use(addAuthorizationHeader);

async function handleErrorResponse(error: any) {
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
            const response = await identityAxios.post('/refresh', {"refreshToken": refreshToken});
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

identityAxios.interceptors.response.use((response) => response, handleErrorResponse);
bffAxios.interceptors.response.use((response) => response, handleErrorResponse);
