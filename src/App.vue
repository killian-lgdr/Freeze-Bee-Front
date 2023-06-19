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


      <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout" :top="snackbar.top">
        {{ snackbar.message }}
      </v-snackbar>
    </v-app-bar>

    <v-container class="d-flex align-center justify-center">
      <v-main>
        <router-view/>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import {computed} from 'vue';
import {useStore} from '@/services/store';
//import {useRouter} from 'vue-router';
import axios from "@/services/axios";
import {store} from '@/services/store';

export default {
  name: 'App',
  created() {
    this.checkAccountStatus();
  },
  methods: {
    checkAccountStatus() {
      // Vérifier l'état du compte uniquement si les tokens existent
      if (store.getters.isAuthenticated) {
        axios.get('/myaccount')
            .then(() => {
              // Account exists, user can access the application
            })
            .catch(() => {
              //const router = useRouter();
              // Account does not exist, redirect the user to the create account page
              //router.push('createaccount');
              // or
              this.$emit('account-not-created'); // Emit a custom event to display an error message
            });
      }
    },
  },
  data: () => ({}),
  setup() {
    const store = useStore();

    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    const snackbar = computed(() => store.state.snackbar);

    const logout = () => {
      store.commit('clearTokens');
      store.commit('showSnackbar', {
        message: 'Log out successful',
        color: 'success',
      });
    };

    return {
      snackbar,
      isAuthenticated,
      logout
    }
  },
}
</script>