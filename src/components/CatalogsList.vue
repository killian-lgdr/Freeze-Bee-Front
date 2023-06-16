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
import axios from 'axios';

export default {
  data() {
    return {
      catalogs: [
        {
          id: 1,
          name: "catalog 1",
          description: "Description du catalog 1",
          image: "https://dkrn4sk0rn31v.cloudfront.net/uploads/2022/10/o-que-e-e-como-comecar-com-golang.jpg",
        },
        {
          id: 2,
          name: "catalog 2",
          description: "Description du catalog 2",
          image: "https://dkrn4sk0rn31v.cloudfront.net/uploads/2022/10/o-que-e-e-como-comecar-com-golang.jpg",
        },
        {
          id: 3,
          name: "catalog 3",
          description: "Description du catalog 3",
          image: "https://dkrn4sk0rn31v.cloudfront.net/uploads/2022/10/o-que-e-e-como-comecar-com-golang.jpg",
        },
        {
          id: 4,
          name: "catalog 4",
          description: "Description du catalog 4",
          image: "https://dkrn4sk0rn31v.cloudfront.net/uploads/2022/10/o-que-e-e-como-comecar-com-golang.jpg",
        },
      ],
    };
  },
  mounted() {
    //this.fetchcatalogs();
  },
  methods: {
    fetchcatalogs() {
      axios.get('http://localhost:3003/catalogs')
          .then(response => {
            this.catalogs = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    addToCart(catalog) {
      // Ajouter ici la logique pour ajouter le catalog au panier
      console.log('catalog ajouté au panier:', catalog);
    },
  },
};
</script>
