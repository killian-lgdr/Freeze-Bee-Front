<template>
  <v-row>
    <v-col v-for="menu in menus" :key="menu.id" cols="12" sm="6" md="4" lg="3">
      <v-card>
        <v-img
            :src="menu.image"
            height="200px"
            cover
        ></v-img>
        <v-card-title class="text-center">{{ menu.name }}</v-card-title>
        <v-card-subtitle>{{ menu.description }}</v-card-subtitle>
        <v-card-text class="text-center">
          <span v-for="article in menu.articles" :key="article.id">{{ article.name }}</span>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn color="primary" @click="addToCart(menu)">Add to cart</v-btn>
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
      menus: [
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
        },
        {
          id: 3,
          name: "Menu 3",
          description: "Description du menu 3",
          image: "https://dkrn4sk0rn31v.cloudfront.net/uploads/2022/10/o-que-e-e-como-comecar-com-golang.jpg",
          articles: [
            {id: 1, name: "Article 1"},
            {id: 2, name: "Article 2"},
            {id: 3, name: "Article 3"},
          ],
        },
        {
          id: 4,
          name: "Menu 4",
          description: "Description du restaurant 4",
          image: "https://dkrn4sk0rn31v.cloudfront.net/uploads/2022/10/o-que-e-e-como-comecar-com-golang.jpg",
          articles: [
            {id: 1, name: "Article 1"},
            {id: 2, name: "Article 2"},
            {id: 3, name: "Article 3"},
          ],
        },
      ],
    };
  },

  mounted() {
    //this.fetchRestaurants();
  },
  created() {
    this.restaurantId = this.$route.params.restaurantId;
    // Appelez une méthode ou effectuez une requête pour récupérer les menus du restaurant spécifié par l'ID
    this.fetchMenus();
  },
  methods: {
    fetchMenus() {
      axios.get(`http://localhost:3003/menus?restaurantId=${this.restaurantId}`)
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