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
              <v-col v-for="menu in cart.menus" :key="menu.id" cols="12" sm="6" md="4">
                <v-card>
                  <v-img :src="menu.image" height="200px" cover></v-img>
                  <v-card-title class="text-center">{{ menu.name }}</v-card-title>
                  <v-card-subtitle>{{ menu.description }}</v-card-subtitle>
                  <v-card-actions class="justify-center">
                    <v-btn color="error" @click="removeFromCart(menu.id)" :to="`/cart`">Remove</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <InfoPayment v-if="isCartLoaded" :cartId="cart.id" />
</template>

<script>
import axios from '@/services/axios';
import {store} from "@/services/store";
import InfoPayment from "@/components/InfoPayment.vue";

export default {
  components: {InfoPayment},
  data() {
    return {
      cart: {menus: []},
      isCartLoaded: false
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
            this.isCartLoaded = true;
            store.commit('showSnackbar', {
              message: 'Cart recovered',
              color: 'success',
            });
          })
          .catch(error => {
            console.error(error);
            store.commit('showSnackbar', {
              message: 'Recover failed',
              color: 'error',
            });
          });
    },
    removeFromCart(id) {
      this.isCartLoaded = false;
      store.commit('showSnackbar', {
        message: 'Updating menus...',
        color: 'info',
      });
      const newCart = this.cart;
      newCart.menus = this.cart.menus.filter(menu => menu.id !== id);
      axios.put(`/mycart`, {cart: newCart})
          .then(response => {
            this.cart = response.data;
            store.commit('showSnackbar', {
              message: 'Menus updated',
              color: 'success',
            });
          })
          .catch(() => {
            store.commit('showSnackbar', {
              message: 'Update failed',
              color: 'error',
            });
          });
      this.fetchCart();
    }
  },
};
</script>

