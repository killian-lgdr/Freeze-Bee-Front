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
      <v-btn v-if="isAuthenticated" to="/catalogs"><v-icon>mdi-silverware-fork-knife</v-icon></v-btn>
      <v-btn v-if="isAuthenticated" to="/cart"><v-icon>mdi-cart-variant</v-icon></v-btn>
      <v-btn v-if="isAuthenticated" to="/orders"><v-icon>mdi-book-clock-outline</v-icon></v-btn>
      <v-btn v-if="isAuthenticated" to="/account"><v-icon>mdi-account</v-icon></v-btn>
      <v-btn v-if="isAuthenticated" to="/" @click="logout()"><v-icon>mdi-logout</v-icon></v-btn>
      <v-btn v-if="!isAuthenticated" to="/login"><v-icon>mdi-login</v-icon></v-btn>
    </v-bottom-navigation>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout" :top="snackbar.top" :close-on-content-click=true location="top">
      {{ snackbar.message }}
    </v-snackbar>
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
  data() {
    return {
      isMobile: false, // Ajoutez cette propriété
    };
  },
  created() {
    this.checkAccountStatus();
  },
  mounted() {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth);
  },
  methods: {
    checkScreenWidth() {
      this.isMobile = window.innerWidth <= 600; // Définissez la valeur appropriée pour le format téléphone
    },
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
    }
  },
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