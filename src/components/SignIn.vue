<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="text-center">Sign In</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="mail" :rules="[rules.required, rules.email]" label="Email"></v-text-field>
            <v-text-field
                v-model="password"
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                label="Password"
                @click:append-inner="show1 = !show1"
            ></v-text-field>
            <v-btn color="primary" to="/" @click="login">Sign In</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
          <p class="text-body-2">Don't have an account?
            <router-link to="/register">Sign Up</router-link>
          </p>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import { store } from '@/services/store';
export default {
  data() {
    return {
      show1: false,
      mail: "",
      password: "",
      rules: {
        required: value => !!value || 'Required.',
        min: value => (value && value.length >= 6) || 'Password must be at least 6 characters long.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    }
  },
  methods: {
    login() {
      const {mail, password} = this;
      store.commit('showSnackbar', {
        message: 'Connecting...',
        color: 'info',
      });
      axios
          .post('http://localhost:8000/identity/login', {
            mail: mail,
            password: password,
          })
          .then(function (response) {
            if (response.data.token !== "") {
              store.commit('setToken', response.data.token);
              store.commit('setRefreshToken', response.data.refreshToken);
              store.commit('showSnackbar', {
                message: 'Login successful',
                color: 'success',
              });
            } else {
              console.log(response.data.message);
              store.commit('showSnackbar', {
                message: 'Login failed',
                color: 'error',
              });
            }
          })
          .catch(function (error) {
            console.log(error.message);
            store.commit('showSnackbar', {
              message: 'Login failed',
              color: 'error',
            });
          });
    },
  },
};
</script>