import {InjectionKey} from 'vue';
import {createStore, Store, useStore as baseUseStore} from 'vuex';

export interface State {
    token: string | null;
    refreshToken: string | null;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        token: null,
        refreshToken: null,
    },

    mutations: {
        setToken(state, token: string) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        setRefreshToken(state, refreshToken: string) {
            state.refreshToken = refreshToken;
            localStorage.setItem('refreshToken', refreshToken);
        },
        clearTokens(state) {
            state.token = null;
            state.refreshToken = null;
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        },
    },


    actions: {
        initializeStore(context) {
            const token = localStorage.getItem('token');
            const refreshToken = localStorage.getItem('refreshToken');
            if (token) {
                context.commit('setToken', token);
            }
            if (refreshToken) {
                context.commit('setRefreshToken', refreshToken);
            }
        },
    },

    getters: {
        isAuthenticated(state) {
            return !!state.token;
        },
    },
});

// définir votre propre fonction d'utilisation du store
export function useStore() {
    return baseUseStore(key);
}
