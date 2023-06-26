<template>
  <v-container class="cart-container">
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="cart-card">
          <v-card-title class="text-center">Cart for {{ cart.name }}</v-card-title>
          <v-card-subtitle>Amount: {{ cart.amount }}</v-card-subtitle>
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
                    <v-btn color="error" @click="removeFromCart(menu)" :to="`/cart`">Remove</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <InfoPayment v-if="isCartLoaded" :cartId="cart.id"/>
</template>

<script>
import {bffAxios} from '@/services/axios';
import {store} from "@/services/store";
import InfoPayment from "@/components/InfoPayment.vue";

export default {
  components: {InfoPayment},
  data() {
    return {
      cart: {
        name: '',
        amount: '',
        menus: [
          {
            id: '',
            name: '',
            description: '',
            amount: '',
          }
        ]
      },
      isCartLoaded: true
    }
  },
  mounted() {
    this.fetchCart();
  },
  methods: {
    fetchCart() {
      store.commit('showSnackbarinfo', {
        message: 'Recovering cart...',
        color: 'info',
      });
      bffAxios.get('/mycart')
          .then(response => {
            this.cart = response.data;
            this.isCartLoaded = true;
            store.commit('showSnackbarinfo', {
              message: 'Cart recovered',
              color: 'success',
            });
          })
          .catch(error => {
            console.error(error);
            store.commit('showSnackbarinfo', {
              message: 'Recover failed',
              color: 'error',
            });
          });
    },
    removeFromCart(selectedMenu) {
      this.isCartLoaded = false;
      store.commit('showSnackbarinfo', {
        message: 'Updating menus...',
        color: 'info',
      });
      const newCart = this.cart;
      newCart.menus = this.cart.menus.filter(menu => menu.id !== selectedMenu.id);
      bffAxios.put(`/removetomycart`, {menu: {id: selectedMenu.id, amount: selectedMenu.amount}})
          .then(response => {
            this.cart = response.data;
            store.commit('showSnackbarinfo', {
              message: 'Menus updated',
              color: 'success',
            });
          })
          .catch(() => {
            store.commit('showSnackbarinfo', {
              message: 'Update failed',
              color: 'error',
            });
          });
      this.fetchCart();
    }
  },
};
</script>

