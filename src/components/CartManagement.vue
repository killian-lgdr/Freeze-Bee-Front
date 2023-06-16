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
import axios from 'axios';

export default {
  data() {
    return {
      cart: [
        {
          id: 1,
          name: "Menu 1",
          description: "Description du menu 1",
          image: "https://dkrn4sk0rn31v.cloudfront.net/uploads/2022/10/o-que-e-e-como-comecar-com-golang.jpg",
          articles: [
            {id: 1, name: "Article 1"},
            {id: 2, name: "Article 2"},
            {id: 3, name: "Article 3"},
          ],
        },
        {
          id: 1,
          name: "Menu 1",
          description: "Description du menu 1",
          image: "https://dkrn4sk0rn31v.cloudfront.net/uploads/2022/10/o-que-e-e-como-comecar-com-golang.jpg",
          articles: [
            {id: 1, name: "Article 1"},
            {id: 2, name: "Article 2"},
            {id: 3, name: "Article 3"},
          ],
        },
        {
          id: 2,
          name: "Menu 2",
          description: "Description du menu 2",
          image: "https://dkrn4sk0rn31v.cloudfront.net/uploads/2022/10/o-que-e-e-como-comecar-com-golang.jpg",
          articles: [
            {id: 1, name: "Article 1"},
            {id: 2, name: "Article 2"},
            {id: 3, name: "Article 3"},
          ],
        }
      ]
    }
  },
  mounted() {
    this.fetchCart();
  },
  methods: {
    fetchCart() {
      axios.get('http://localhost:8000/cart')
          .then(response => {
            this.cart = response.data;
          })
          .catch(error => {
            console.error('Error fetching cart:', error);
            // Ajoutez ici une logique de gestion des erreurs ou un message d'erreur
          });
    },
    removeFromCart(id) {
      axios.delete(`http://localhost:8000/cart/${id}`)
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
    axios.post('http://localhost:8000/command', {cart: this.cart})
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

