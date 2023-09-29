<template>
  <v-container class="cart-container">
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="cart-card">
          <v-card-title class="text-center">Formulaire de Product</v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="2">
                  <v-text-field v-model="form.id" label="id"></v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-text-field v-model="form.nom" label="Nom"></v-text-field>
                </v-col>
                <v-col cols="5">
                  // Ingredient part form
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-textarea v-model="form.description" label="Description"></v-textarea>
                </v-col>
                <v-col cols="6">
                  <v-textarea v-model="form.pUHT" label="pUHT"></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="getProduct()">Récupérer</v-btn>
            <v-btn color="primary" @click="createProduct()">Créer</v-btn>
            <v-btn color="primary" @click="updateProduct()">Modifier</v-btn>
            <v-btn color="primary" @click="deleteProduct()">Supprimer</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-if="isProductLoaded" class="cart-container">
    <v-row justify="center">
      <v-col  cols="12">
        <v-row>
          <v-col v-for="Product in allProduct" :key="Product.id" cols="12" sm="6" md="4">
            <v-card>
              <v-card-title class="text-center">{{ Product.nom }}</v-card-title>
              <v-card-subtitle>{{ Product.id }}</v-card-subtitle>
              <v-card-text>
                <v-row>
                  <v-col cols="12">{{ Product.description }}</v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">{{ Product.pUHT }}</v-col>
                </v-row>
                <v-row>
                  <v-col v-for= "productIngredient in Product.productIngredients" :key="productIngredient.id" cols="12">{{ productIngredient.ingredient.nom }} {{ productIngredient.grammage }}</v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {bffAxios} from '@/services/axios';

export default {
  data() {
    return {
      form: {
        id: '',
        nom: '',
        description: '',
        pUHT: '',
        //Ingredient part form
        grammage: ''
      },
      allIngredient: null,
      allProduct: [
        {
          id: '',
          nom: '',
          description: '',
          pUHT: '',
          productIngredients: [{
            id:'',
            ingredient: {nom:''},
            grammage: ''
          }]
        }
      ],
      isProductLoaded: false
    }
  },
  mounted() {
    this.getAllProduct();
  },
  methods: {
    getAllProduct() {
      bffAxios.get('/ingredient')
          .then(response => {
            this.allIngredient = response.data;
            // Ingredient form parser
          })
          .catch(error => {
            console.error(error);
          });
      bffAxios.get('/product')
          .then(response => {
            this.allProduct = response.data;
            this.isProductLoaded = true;
          })
          .catch(error => {
            console.error(error);
          });
    },
    getProduct() {
      bffAxios.get('/product/' + this.form.id)
          .then(response => {
            const Product = response.data;

            this.form.nom = Product.nom;
            this.form.description = Product.description;
            this.form.pUHT = Product.pUHT;
            //Ingredient filling
          })
          .catch(error => {
            console.error(error);
          });
    },
    createProduct() {
      const newProduct = {
        nom: this.form.nom,
        description: this.form.description,
        Ingredient: this.allIngredients.find(Ingredient => Ingredient.nom === this.form.selectedIngredient),
        pUHT: this.form.pUHT
      };

      bffAxios.post('/product', newProduct)
          .then(() => {
            this.isProductLoaded = false;
            this.getAllProduct();
          })
          .catch(error => {
            console.error(error);
          });
    },
    updateProduct() {
      const newProduct = {
        id: this.form.id,
        nom: this.form.nom,
        description: this.form.description,
        Ingredient: this.allIngredients.find(Ingredient => Ingredient.nom === this.form.selectedIngredient),
        pUHT: this.form.pUHT
      };

      bffAxios.put('/product', newProduct)
          .then(() => {
            this.isProductLoaded = false;
            this.getAllProduct();
          })
          .catch(error => {
            console.error(error);
          });
    },
    deleteProduct() {
      bffAxios.delete(`/product/` + this.form.id)
          .then(() => {
            this.isProductLoaded = false;
            this.getAllProduct();
          })
          .catch(error => {
            console.error(error);
          });
    }
  },
};
</script>

