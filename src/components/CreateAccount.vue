<template>
  <v-container class="create-account-container">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="create-account-card">
          <v-card-title class="text-center">Create Account</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createAccount">
              <v-text-field v-model="form.firstName" label="First Name" required></v-text-field>
              <v-text-field v-model="form.name" label="Name" required></v-text-field>
              <v-text-field v-model="form.birthday" label="Birthday" type="date" required></v-text-field>
              <v-text-field v-model="form.phoneNumber" label="Phone Number" required></v-text-field>
              <v-text-field v-model="form.address.street" label="Street" required></v-text-field>
              <v-text-field v-model="form.address.postalCode" label="Postal Code" required></v-text-field>
              <v-text-field v-model="form.address.city" label="City" required></v-text-field>
              <v-text-field v-model="form.address.country" label="Country" required></v-text-field>
              <v-btn type="submit" :to="`/signin`" color="primary">Create</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '@/services/axios';
import {store} from "@/services/store";

export default {
  data() {
    return {
      form: {
        firstName: '',
        name: '',
        birthday: null,
        phoneNumber: null,
        address: {
          street: '',
          postalCode: null,
          city: '',
          country: '',
        },
      },
    };
  },
  methods: {
    createAccount() {
      store.commit('showSnackbar', {
        message: 'Creating account...',
        color: 'info',
      });
      axios.post('/accounts', this.form)
          .then(() => {
            store.commit('showSnackbar', {
              message: 'Account created',
              color: 'success',
            });
          })
          .catch(() => {
            store.commit('showSnackbar', {
              message: 'Creation failed',
              color: 'error',
            });
          });
    },
  },
};
</script>