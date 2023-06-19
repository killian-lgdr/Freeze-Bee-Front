<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-img :src="menu.image" height="200px" cover></v-img>
        <v-card-title class="text-center">{{ menu.name }}</v-card-title>
        <v-card-subtitle>{{ menu.description }}</v-card-subtitle>
        <v-card-text>💰{{ menu.price }}</v-card-text>
        <v-row>
          <v-col v-for="article in menu.articles" :key="article.id" cols="12" sm="6" md="4" lg="3">
            <v-card>
              <v-img :src="article.image" height="200px" cover></v-img>
              <v-card-title class="text-center">{{ article.name }}</v-card-title>
              <v-card-subtitle>{{ article.description }}</v-card-subtitle>
              <v-card-text>💰{{ article.price }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-card-actions class="justify-center">
          <v-btn color="primary" @click="addToCart(menu)">Add to cart</v-btn>
          <v-btn color="secondary" :to="`/catalogs/${this.catalogId}`">Back</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from '@/services/axios';
import {store} from "@/services/store";

export default {
  data() {
    return {
      menu: {}
    };
  },

  mounted() {
    this.catalogId = this.$route.params.catalogId;
    this.menuId = this.$route.params.menuId;
    this.fetchMenus();
  },
  methods: {
    fetchMenus() {
      store.commit('showSnackbar', {
        message: 'Recovering menu...',
        color: 'info',
      });
      axios.get(`/catalogs/${this.catalogId}/menus/${this.menuId}`)
          .then(response => {
            this.menu = response.data;
            store.commit('showSnackbar', {
              message: 'Menu recovered',
              color: 'success',
            });
          })
          .catch(error => {
            console.error(error);
            store.commit('showSnackbar', {
              message: 'Error while recovering menu',
              color: 'error',
            });
          });
    },
    addToCart(restaurant) {
      // Ajouter ici la logique pour ajouter le restaurant au panier
      console.log('Menu ajouté au panier:', restaurant);
    },
  },
};
</script>