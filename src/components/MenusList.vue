<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-img
            :src="catalog.image"
            height="200px"
            cover
        ></v-img>
        <v-card-title class="text-center">{{ catalog.name }}</v-card-title>
        <v-card-subtitle>{{ description }}</v-card-subtitle>
        <v-row class="justify-center">
          <v-col v-for="menu in catalog.menus" :key="menu.id" cols="10" sm="5">
            <v-card>
              <v-img
                  :src="menu.image"
                  height="200px"
                  cover
              ></v-img>
              <v-card-title class="text-center">{{ menu.name }}</v-card-title>
              <v-card-subtitle>{{ menu.description }}</v-card-subtitle>
              <v-card-text>💰{{ menu.price }}</v-card-text>
              <v-card-text class="text-center">
                <span v-for="article in menu.articles" :key="article.id">{{ article.name }}<br/></span>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn color="primary" :to="`/catalogs/${this.catalogId}/menus/${menu.id}`">View menu</v-btn>
                <v-btn color="primary" @click="addToCart(menu)">Add to cart</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-card-actions class="justify-center">
          <v-btn color="secondary" :to="`/catalogs`">Back</v-btn>
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
      catalog: {}
    };
  },

  mounted() {
    this.catalogId = this.$route.params.catalogId;
    this.fetchMenus();
  },
  methods: {
    fetchMenus() {
      store.commit('showSnackbar', {
        message: 'Recovering menus...',
        color: 'info',
      });
      axios.get(`/catalogs/${this.catalogId}`)
          .then(response => {
            this.catalog = response.data;
            store.commit('showSnackbar', {
              message: 'Menus recovered',
              color: 'success',
            });
          })
          .catch(error => {
            console.error(error);
            store.commit('showSnackbar', {
              message: 'Error while recovering menus',
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