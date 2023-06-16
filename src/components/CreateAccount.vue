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
              <v-text-field v-model="form.birthday" label="Birthday" required></v-text-field>
              <v-date-picker v-model="form.birthday"></v-date-picker>
              <v-text-field v-model="form.phoneNumber" label="Phone Number" required></v-text-field>
              <v-text-field v-model="form.address.street" label="Street" required></v-text-field>
              <v-text-field v-model="form.address.postalCode" label="Postal Code" required></v-text-field>
              <v-text-field v-model="form.address.city" label="City" required></v-text-field>
              <v-text-field v-model="form.address.country" label="Country" required></v-text-field>
              <v-btn type="submit" color="primary">Create</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

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
      axios.post('http://localhost:8000/account/users', this.form)
          .then(response => {
            console.log('Account created successfully:', response.data);
            // Ajoutez ici une logique de redirection ou un message de succès
          })
          .catch(error => {
            console.error('Error creating account:', error);
            // Ajoutez ici une logique de gestion des erreurs ou un message d'erreur
          });
    },
  },
};
</script>