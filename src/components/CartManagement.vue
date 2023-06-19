<template>
  <v-container class="cart-container">
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="cart-card">
          <v-card-title class="text-center">Cart</v-card-title>
          <v-card-text>
            <v-row v-if="cart.length === 0">
              <v-col cols="12">
                <p class="text-center">Your cart is empty.</p>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col v-for="menu in cart" :key="menu.id" cols="12" sm="6" md="4">
                <v-card>
                  <v-img :src="menu.image" height="200px" cover></v-img>
                  <v-card-title class="text-center">{{ menu.name }}</v-card-title>
                  <v-card-subtitle>{{ menu.description }}</v-card-subtitle>
                  <v-card-actions class="justify-center">
                    <v-btn color="error" @click="removeFromCart(menu.id)">Remove</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="order" :disabled="cart.length === 0">Order</v-btn>
          </v-card-actions>
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
      cart: []
    }
  },
  mounted() {
    this.fetchCart();
  },
  methods: {
    fetchCart() {
      store.commit('showSnackbar', {
        message: 'Recovering cart...',
        color: 'info',
      });
      axios.get('/mycart')
          .then(response => {
            this.cart = response.data;
            store.commit('showSnackbar', {
              message: 'Cart recovered',
              color: 'success',
            });
          })
          .catch(error => {
            console.error(error);
            store.commit('showSnackbar', {
              message: 'Error while recovering cart',
              color: 'error',
            });
          });
    },
    removeFromCart(id) {
      axios.delete(`/cart/${id}`)
          .then(response => {
            this.cart = response.data;
          })
          .catch(error => {
            console.error('Error fetching cart:', error);
            // Ajoutez ici une logique de gestion des erreurs ou un message d'erreur
          });
    }
  },
  order() {
    axios.post('/command', {cart: this.cart})
        .then(response => {
          console.log('Order placed successfully:', response.data);
          // Ajoutez ici une logique de redirection ou un message de succès
        })
        .catch(error => {
          console.error('Error placing order:', error);
          // Ajoutez ici une logique de gestion des erreurs ou un message d'erreur
        });
  }

};
</script>

