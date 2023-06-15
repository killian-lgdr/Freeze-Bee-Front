<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="text-center">Sign Up</v-card-title>
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
            <v-btn color="primary" @click="register">Sign Up</v-btn>
          </v-form>
        </v-card-text>

        <v-card-actions class="justify-center">
          <p class="text-body-2">Have an account?
            <router-link to="/login">Sign In</router-link>
          </p>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "../services/axios";

export default {
  name: "SignUp",
  data() {
    return {
      show1: false,
      mail: "",
      password: "",
      type: "",
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
    register() {
      const {mail, password} = this;
      axios.post('/register', {
        mail: mail,
        password: password,
        type: "user"
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