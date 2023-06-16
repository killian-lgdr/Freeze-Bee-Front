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
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                label="Password"
                @click:append="show1 = !show1"
            ></v-text-field>
            <v-btn color="primary" @click="login">Sign In</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
          <p class="text-body-2">Don't have an account?
            <router-link to="/register" >Sign Up</router-link>
          </p>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "../services/axios";

export default {
  data() {
    return {
      show1: false,
      mail: "",
      password: "",
      rules: {
        required: value => !!value || 'Required.',
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
      axios.post('/login', {
        mail: mail,
        password: password,
      })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error.message);
          });
    },
  },
};
</script>