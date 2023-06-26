<template>
  <v-row v-if="isCatalogLoaded">
    <v-col cols="12">
      <v-card>
        <v-img
            :src="catalog.image"
            height="200px"
            cover
        ></v-img>
        <v-card-title class="text-center">{{ catalog.name }}</v-card-title>
        <v-card-subtitle>{{ catalog.description }}</v-card-subtitle>
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
              <v-card-text>💰{{ menu.amount }}</v-card-text>
              <v-card-text class="text-center">
                <span v-for="article in menu.articles" :key="article.id">{{ article.name }}<br/></span>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn color="primary" :to="`/catalogs/${this.catalogId}/menus/${menu.id}`">View menu</v-btn>
                <v-btn color="secondary" @click="addToCart(menu)">Add to cart</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-card-actions class="justify-center">
          <v-btn color="error" :to="`/catalogs`">Back</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {bffAxios} from '@/services/axios';
import {store} from '@/services/store';

export default {
  data() {
    return {
      catalog: {
        id: '',
        image: '',
        name: '',
        description: '',
        menus: [
          {
            id: '',
            image: '',
            name: '',
            description: '',
            amount: '',
            articles: [
              {
                id: '',
                name: '',
              }
            ]
          }
        ],
      },
      isCatalogLoaded: false
    };
  },
  mounted() {
    this.fetchMenus();
  }
  ,
  methods: {
    fetchMenus() {
      store.commit('showSnackbarinfo', {
        message: 'Recovering menus...',
        color: 'info',
      });
      bffAxios.get(`/catalogs/${this.param.catalogId}`)
          .then(response => {
            this.catalog = response.data;
            this.isCatalogLoaded = true;
            store.commit('showSnackbarinfo', {
              message: 'Menus recovered',
              color: 'success',
            });
          })
          .catch(error => {
            console.error(error);
            store.commit('showSnackbarinfo', {
              message: 'Error while recovering menus',
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
    },
  }
  ,
};
</script>
