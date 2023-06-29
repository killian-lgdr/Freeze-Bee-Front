<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card>
        <v-row justify="center">
          <v-col cols="11">
            <v-card>
              <v-card-title class="text-center">Sign Up</v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="credentials.mail" :rules="[rules.required, rules.email]"
                                label="Email"></v-text-field>
                  <v-text-field
                      v-model="credentials.password"
                      :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      label="Password"
                      @click:append-inner="show1 = !show1"
                  ></v-text-field>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="11">
            <v-card class="create-account-card">
              <v-card-title class="text-center">Create Account</v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="form.firstName" label="First Name" required></v-text-field>
                  <v-text-field v-model="form.name" label="Name" required></v-text-field>
                  <v-text-field v-model="form.birthday" label="Birthday" type="date" required></v-text-field>
                  <v-text-field v-model="form.phoneNumber" label="Phone Number" required></v-text-field>
                  <v-text-field v-model="form.address.street" label="Street" required></v-text-field>
                  <v-text-field v-model="form.address.postalCode" label="Postal Code" required></v-text-field>
                  <v-text-field v-model="form.address.city" label="City" required></v-text-field>
                  <v-text-field v-model="form.address.country" label="Country" required></v-text-field>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-card-actions class="justify-center">
          <v-spacer></v-spacer>
          <p>Have an account?
            <router-link to="/login">Sign In</router-link>
          </p>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="register" to="/">Sign Up</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {identityAxios, bffAxios} from "@/services/axios";
import {store} from "@/services/store";

function createAccount() {
  store.commit('showSnackbarinfo', {
    message: 'Creating account...',
    color: 'info',
  });
  bffAxios.post('/accounts', this.form)
      .then(() => {
        store.commit('showSnackbarinfo', {
          message: 'Account created',
          color: 'success',
        });
      })
      .catch(() => {
        store.commit('showSnackbarinfo', {
          message: 'Account creation failed',
          color: 'error',
        });
      });
}

export default {
  data() {
    return {
      credentials: {
        mail: "",
        password: "",
        type: "user",
      },
      form: {
        firstName: "",
        name: "",
        birthday: null,
        phoneNumber: null,
        address: {
          street: "",
          postalCode: null,
          city: "",
          country: "",
        },
      },
      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (value) => (value && value.length >= 6) || "Password must be at least 6 characters long.",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  methods: {
    register() {
      store.commit('showSnackbarinfo', {
        message: 'Creating identity...',
        color: 'info',
      });
      identityAxios.post('/register', this.credentials)
          .then((response) => {
            console.log(response);
            store.commit('showSnackbarinfo', {
              message: 'Identity created',
              color: 'success',
            });
            this.login();
          })
          .catch((error) => {
            console.log(error.message);
            store.commit('showSnackbarinfo', {
              message: 'Identity creation failed',
              color: 'error',
            });
          });
    },
    login() {
      const {mail, password} = this.credentials;
      store.commit('showSnackbarinfo', {
        message: 'Connecting...',
        color: 'info',
      });
      identityAxios.post('/login', {
        mail: mail,
        password: password,
      })
          .then((response) => {
            store.commit('setToken', response.data.token);
            store.commit('setRefreshToken', response.data.refreshToken);
            store.commit('connectSocket', store.state.token);
            store.commit('showSnackbarinfo', {
              message: 'Login successful',
              color: 'success',
            });
            this.createAccount();
          })
          .catch((error) => {
            console.log(error);
            store.commit('showSnackbarinfo', {
              message: 'Login failed',
              color: 'error',
            });
          });
    },
  },
  created() {
    // Call createAccount method
    this.createAccount = createAccount.bind(this);
  },
};
</script>