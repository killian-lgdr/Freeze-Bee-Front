<template>
  <v-row v-if="isMenuLoaded">
    <v-col cols="12">
      <v-card>
        <v-img :src="menu.image" height="200px" cover></v-img>
        <v-card-title class="text-center">{{ menu.name }}</v-card-title>
        <v-card-subtitle>{{ menu.description }}</v-card-subtitle>
        <v-card-text>💰{{ menu.amount }}</v-card-text>
        <v-row>
          <v-col v-for="article in menu.articles" :key="article.id" cols="12" sm="6" md="4" lg="3">
            <v-card>
              <v-img :src="article.image" height="200px" cover></v-img>
              <v-card-title class="text-center">{{ article.name }}</v-card-title>
              <v-card-subtitle>{{ article.description }}</v-card-subtitle>
              <v-card-text>💰{{ article.amount }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-card-actions class="justify-center">
          <v-btn color="secondary" @click="addToCart(menu)">Add to cart</v-btn>
          <v-btn color="error" :to="`/catalogs/${this.$route.params.catalogId}`">Back</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {bffAxios} from '@/services/axios';
import {store} from "@/services/store";

export default {
  data() {
    return {
      id: '',
      menu: {
        id: '',
        image: '',
        name: '',
        description: '',
        amount: '',
        articles: [
          {
            id: '',
            image: '',
            name: '',
            description: '',
            amount: ''
          }
        ]
      },
      isMenuLoaded: false
    };
  },

  mounted() {
    this.fetchMenu();
  },
  methods: {
    fetchMenu() {
      store.commit('showSnackbarinfo', {
        message: 'Recovering menu...',
        color: 'info',
      });
      bffAxios.get(`/catalogs/${this.$route.params.catalogId}/menus/${this.$route.params.menuId}`)
          .then(response => {
            this.menu = response.data;
            this.isMenuLoaded = true;
            store.commit('showSnackbarinfo', {
              message: 'Menu recovered',
              color: 'success',
            });
          })
          .catch(error => {
            console.error(error);
            store.commit('showSnackbarinfo', {
              message: 'Error while recovering menu',
              color: 'error',
            });
          });
    },
    addToCart(menu) {
      store.commit('showSnackbarinfo', {
        message: 'Update Cart...',
        color: 'info',
      });
      bffAxios.put('/addtomycart', {menu: {id: menu.id, amount: menu.amount}})
          .then(() => {
            store.commit('showSnackbarinfo', {
              message: 'Cart updated',
              color: 'success',
            });
          })
          .catch(error => {
            console.error(error);
            store.commit('showSnackbarinfo', {
              message: 'Update failed',
              color: 'error',
            });
          });
    }
  },
};
</script>