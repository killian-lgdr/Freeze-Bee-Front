<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-img
            :src="image"
            height="200px"
            cover
        ></v-img>
        <v-card-title class="text-center">{{ name }}</v-card-title>
        <v-card-subtitle>{{ description }}</v-card-subtitle>
        <v-row class="justify-center">
          <v-col v-for="menu in menus" :key="menu.id" cols="10" sm="5">
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
import axios from 'axios';

export default {
  data() {
    return {

      id: 1,
      name: "catalog 1",
      description: "Description du catalog 1",
      image: "https://dkrn4sk0rn31v.cloudfront.net/uploads/2022/10/o-que-e-e-como-comecar-com-golang.jpg",

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
      ]
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