import {InjectionKey} from 'vue';
import {createStore, Store, useStore as baseUseStore} from 'vuex';

export interface State {
    token: string | null;
    refreshToken: string | null;
    snackbar: {
        show: boolean;
        message: string;
        color: string;
        timeout: number;
        top: boolean;
    };

}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        token: null,
        refreshToken: null,
        snackbar: {
            show: false,
            message: '',
            color: '',
            timeout: 3000,
            top: false
        },
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
        showSnackbar(state, { message, color = 'success', timeout = 3000, top = false,onClick = true }) {
            state.snackbar.message = message;
            state.snackbar.color = color;
            state.snackbar.timeout = timeout;
            state.snackbar.top = top;
            state.snackbar.show = true;
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
