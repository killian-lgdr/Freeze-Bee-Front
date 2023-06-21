<template>
  <v-row>
    <v-col cols="12" sm="8" md="6">
      <h2>Catalogs list</h2>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="6" v-for="catalog in catalogs" :key="catalog.id">
      <v-card>
        <v-img
            :src="catalog.image"
            height="200px"
            cover
        ></v-img>
        <v-card-title class="text-center">{{ catalog.name }}</v-card-title>
        <v-card-text>{{ catalog.description }}</v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="primary" :to="`/catalogs/${catalog.id}`">View menus</v-btn>
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
      catalogs: [],
    };
  },
  mounted() {
    this.fetchCatalogs();
  },
  methods: {
    fetchCatalogs() {
      store.commit('showSnackbarinfo', {
        message: 'Recovering catalogs...',
        color: 'info',
      });
      bffAxios.get('/catalogs')
          .then(response => {
            this.catalogs = response.data;
            store.commit('showSnackbarinfo', {
              message: 'Catalogs recovered',
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
    }
  },
};
</script>
