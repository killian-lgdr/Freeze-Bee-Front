import axios from 'axios';

export const bffAxios = axios.create({
    baseURL: process.env.VUE_APP_BFF_URL,
    timeout: 5000,
});