<template>
  <v-app>
    <v-app-bar v-if="!isMobile" color="primary" app>
      <v-btn to="/">
        <v-toolbar-title>CESI Eats</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="isAuthenticated" to="/catalogs" icon>
        <v-icon>mdi-silverware-fork-knife</v-icon>
      </v-btn>
      <v-btn v-if="isAuthenticated" to="/cart" icon>
        <v-icon>mdi-cart-variant</v-icon>
      </v-btn>
      <v-btn v-if="isAuthenticated" to="/orders" icon>
        <v-icon>mdi-book-clock-outline</v-icon>
      </v-btn>
      <v-btn v-if="isAuthenticated" to="/account" icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn v-if="isAuthenticated" to="/" @click="logout()" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn v-if="!isAuthenticated" to="/login" icon>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container class="d-flex align-center justify-center">
      <v-main>
        <router-view/>
      </v-main>
    </v-container>

    <v-bottom-navigation v-if="isMobile" color="primary" :elevation="0" grow>
      <v-btn v-if="isAuthenticated" to="/catalogs">
        <v-icon>mdi-silverware-fork-knife</v-icon>
      </v-btn>
      <v-btn v-if="isAuthenticated" to="/cart">
        <v-icon>mdi-cart-variant</v-icon>
      </v-btn>
      <v-btn v-if="isAuthenticated" to="/orders">
        <v-icon>mdi-book-clock-outline</v-icon>
      </v-btn>
      <v-btn v-if="isAuthenticated" to="/account">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn v-if="isAuthenticated" to="/" @click="logout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn v-if="!isAuthenticated" to="/login">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-snackbar v-model="snackbarinfo.show" :color="snackbarinfo.color" :timeout="snackbarinfo.timeout"
                :top="snackbarinfo.top" :close-on-content-click=true location="top">
      {{ snackbarinfo.message }}
    </v-snackbar>
    <v-snackbar v-model="snackbarorder.show" :color="snackbarorder.color" :timeout="snackbarorder.timeout"
                :top="snackbarorder.top" :close-on-content-click=true location="center">
      The order has been {{ snackbarorder.message.status }}
      <template v-slot:actions>
        <v-btn color="primary" variant="text" @click="snackbarinfo.show = false" to="/orders">
          Go to
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { computed } from 'vue';
import { useStore } from '@/services/store';

export default {
  name: 'App',
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth);
  },
  methods: {
    checkScreenWidth() {
      this.isMobile = window.innerWidth <= 600;
    },
  },
  setup() {
    const store = useStore();

    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    const snackbarinfo = computed(() => store.state.snackbarinfo);
    const snackbarorder = computed(() => store.state.snackbarorder);
    
    store.commit('initSocket');
    if (isAuthenticated.value) {
      store.commit('connectSocket', store.state.token);
    }

    const logout = () => {
      store.commit('disconnectSocket');
      store.commit('clearTokens');
      store.commit('showSnackbarinfo', {
        message: 'Log out successful',
        color: 'success',
      });
    };

    return {
      isAuthenticated,
      snackbarinfo,
      snackbarorder,
      logout
    };
  },
};
</script>