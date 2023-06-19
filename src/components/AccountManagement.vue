<template>
  <v-container class="manage-account-container">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="manage-account-card">
          <v-card-title class="text-center">Manage Account</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="updateAccount">
              <v-text-field v-model="form.firstName" label="First Name" required></v-text-field>
              <v-text-field v-model="form.name" label="Name" required></v-text-field>
              <v-text-field v-model="form.birthday" label="Birthday" type="date" required></v-text-field>
              <v-text-field v-model="form.phoneNumber" label="Phone Number" required></v-text-field>
              <v-text-field v-model="form.address.street" label="Street" required></v-text-field>
              <v-text-field v-model="form.address.postalCode" label="Postal Code" required></v-text-field>
              <v-text-field v-model="form.address.city" label="City" required></v-text-field>
              <v-text-field v-model="form.address.country" label="Country" required></v-text-field>
              <v-btn type="submit" color="primary">Update</v-btn>
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
        birthday: '',
        phoneNumber: '',
        address: {
          street: '',
          postalCode: '',
          city: '',
          country: '',
        }
      }
    };
  },
  mounted() {
    this.fetchAccount();
  },
  methods: {
    fetchAccount() {
      store.commit('showSnackbar', {
        message: 'Recovering account...',
        color: 'info',
      });
      axios.get('/myaccount')
          .then(response => {
            this.form = response.data;
            store.commit('showSnackbar', {
              message: 'Account recovered',
              color: 'success',
            });
          })
          .catch(error => {
            console.error(error);
            store.commit('showSnackbar', {
              message: 'Error while recovering account',
              color: 'error',
            });
          });
    },
    updateAccount() {
      axios.put('http://localhost:8000/account/users', this.form)
          .then(response => {
            console.log('Account updated successfully:', response.data);
            // Ajoutez ici une logique de redirection ou un message de succès
          })
          .catch(error => {
            console.error('Error updating account:', error);
            // Ajoutez ici une logique de gestion des erreurs ou un message d'erreur
          });
    },
  },
};
</script>