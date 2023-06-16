<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-img :src="menu.image" height="200px" cover></v-img>
        <v-card-title class="text-center">{{ menu.name }}</v-card-title>
        <v-card-subtitle>{{ menu.description }}</v-card-subtitle>

        <v-row>
          <v-col v-for="article in menu.articles" :key="article.id" cols="12" sm="6" md="4" lg="3">
            <v-card>
              <v-img :src="article.image" height="200px" cover></v-img>
              <v-card-title class="text-center">{{ article.name }}</v-card-title>
              <v-card-subtitle>{{ article.description }}</v-card-subtitle>
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
import axios from 'axios';

export default {
  data() {
    return {
      menu:
          {
            id: 1,
            name: "Menu 1",
            description: "Description du menu 1",
            image: "https://dkrn4sk0rn31v.cloudfront.net/uploads/2022/10/o-que-e-e-como-comecar-com-golang.jpg",
            articles: [
              {
                id: 1,
                name: "Article 1",
                description: "Description de l'article 1",
                image: "https://dkrn4sk0rn31v.cloudfront.net/uploads/2022/10/o-que-e-e-como-comecar-com-golang.jpg",
              },
              {
                id: 2,
                name: "Article 2",
                description: "Description de l'article 2",
                image: "https://dkrn4sk0rn31v.cloudfront.net/uploads/2022/10/o-que-e-e-como-comecar-com-golang.jpg",
              },
            ],
          }
    };
  },

  mounted() {
    //this.fetchRestaurants();
  },
  created() {
    this.catalogId = this.$route.params.catalogId;
    // Appelez une méthode ou effectuez une requête pour récupérer les menus du restaurant spécifié par l'ID
    this.fetchMenus();
  },
  methods: {
    fetchMenus() {
      axios.get(`http://localhost:3003/menus?restaurantId=${this.catalogId}`)
          .then(response => {
            this.menus = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    addToCart(restaurant) {
      // Ajouter ici la logique pour ajouter le restaurant au panier
      console.log('Menu ajouté au panier:', restaurant);
    },
  },
};
</script>