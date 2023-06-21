import {InjectionKey} from 'vue';
import {createStore, Store, useStore as baseUseStore} from 'vuex';

export interface State {
    token: string | null;
    refreshToken: string | null;
    snackbarinfo: {
        show: boolean;
        message: string;
        color: string;
        timeout: number;
        top: boolean;
    };
    snackbarorder: {
        show: boolean;
        message: {id: string, status: string};
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
        snackbarinfo: {
            show: false,
            message: '',
            color: '',
            timeout: 3000,
            top: false
        },
        snackbarorder: {
            show: false,
            message: {id:'', status: ''},
            color: '',
            timeout: 60000,
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
        showSnackbarinfo(state, { message, color = 'success', timeout = 3000, top = false}) {
            state.snackbarinfo.message = message;
            state.snackbarinfo.color = color;
            state.snackbarinfo.timeout = timeout;
            state.snackbarinfo.top = top;
            state.snackbarinfo.show = true;
        },
        showSnackbarorder(state, { message, color = 'success', timeout = 3000, top = false}) {
            state.snackbarorder.message = message;
            state.snackbarorder.color = color;
            state.snackbarorder.timeout = timeout;
            state.snackbarorder.top = top;
            state.snackbarorder.show = true;
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
