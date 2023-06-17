<template>
  <v-app>
    <v-app-bar color="primary" app>
      <v-btn to="/">
        <v-toolbar-title>CESI Eats</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="isAuthenticated" to="/catalogs">
        <v-icon>mdi-silverware-fork-knife</v-icon>
      </v-btn>
      <v-btn v-if="isAuthenticated" to="/cart">
        <v-icon>mdi-cart-variant</v-icon>
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
    </v-app-bar>

    <v-container class="d-flex align-center justify-center">
      <v-main>
        <router-view/>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import { computed } from 'vue';
import { useStore } from '@/services/store';

export default {
  name: 'App',

  data: () => ({}),
  setup() {
    const store = useStore();

    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    const logout = () => {
      store.commit('clearTokens');
    };

    return {
      isAuthenticated,
      logout
    }
  },
}
</script>