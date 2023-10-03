<template>
  <v-container class="cart-container">
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="cart-card">
          <v-card-title class="text-center">Formulaire de Product</v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="1">
                  <v-text-field v-model="form.id" label="id"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field v-model="form.nom" label="Nom"></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field v-model="form.gamme" label="Gamme"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-select
                      v-model="form.selectedIngredients"
                      :items="form.ingredientOptions"
                      label="Ingrédients"
                      multiple
                      chips
                      dense
                  ></v-select>
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
              <v-btn v-if="KeyCloakService.HasRequiredRoles(['Production', 'R&D', 'Commerce'])" color="primary" @click="getProduct()">Récupérer</v-btn>
              <v-btn v-if="KeyCloakService.HasRequiredRoles(['R&D'])" color="primary" @click="createProduct()">Créer</v-btn>
              <v-btn v-if="KeyCloakService.HasRequiredRoles(['R&D'])" color="primary" @click="updateProduct()">Modifier</v-btn>
              <v-btn v-if="KeyCloakService.HasRequiredRoles(['R&D'])" color="primary" @click="deleteProduct()">Supprimer</v-btn>
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
                  <v-col cols="12">{{ Product.gamme }}</v-col>
                </v-row>
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
import HttpService from '@/services/HttpService';
import KeyCloakService from "@/security/Keycloakservice";

export default {
  computed: {
    KeyCloakService() {
      return KeyCloakService
    }
  },
  data() {
    return {
      form: {
        id: '',
        nom: '',
        gamme: '',
        description: '',
        pUHT: '',
        selectedIngredients: [],
        ingredientOptions: []
      },
      allIngredients: null,
      allProduct: [
        {
          id: '',
          nom: '',
          gamme: '',
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
      HttpService.getAxiosClient().get('/ingredient')
          .then(response => {
            this.allIngredients = response.data;
            this.form.ingredientOptions = response.data.map(ingredient => ingredient.nom);
          })
          .catch(error => {
            console.error(error);
          });
      HttpService.getAxiosClient().get('/product')
          .then(response => {
            this.allProduct = response.data;
            this.isProductLoaded = true;
          })
          .catch(error => {
            console.error(error);
          });
    },
    getProduct() {
      HttpService.getAxiosClient().get('/product/' + this.form.id)
          .then(response => {
            this.form.nom = response.data.nom;
            this.form.description = response.data.description;
            this.form.pUHT = response.data.pUHT;
            this.form.gamme = response.data.gamme;
            this.form.selectedIngredients = response.data.productIngredients.map(item => item.ingredient.nom);
          })
          .catch(error => {
            console.error(error);
          });
    },
    createProduct() {
      const selectedIngredientNames = this.form.selectedIngredients;
      const productIngredients = selectedIngredientNames.map(name => {
        const ingredient = this.allIngredients.find(ing => ing.nom === name);
        return {
          ingredient: {
            id: ingredient.id,
            nom: ingredient.nom,
            description: ingredient.description,
          },
          grammage: 100,
        };
      });

      const newProduct = {
        nom: this.form.nom,
        description: this.form.description,
        pUHT: this.form.pUHT,
        gamme: this.form.gamme,
        productIngredients: productIngredients,
      };

      HttpService.getAxiosClient().post('/product', newProduct)
          .then(() => {
            this.isProductLoaded = false;
            this.getAllProduct();
          })
          .catch(error => {
            console.error(error);
          });
    },
    updateProduct() {
      const selectedIngredientNames = this.form.selectedIngredients;
      const productIngredients = selectedIngredientNames.map(name => {
        const ingredient = this.allIngredients.find(ing => ing.nom === name);
        return {
          ingredient: {
            id: ingredient.id,
            nom: ingredient.nom,
            description: ingredient.description,
          },
          grammage: 100,
        };
      });

      const newProduct = {
        id: this.form.id,
        nom: this.form.nom,
        description: this.form.description,
        pUHT: this.form.pUHT,
        gamme: this.form.gamme,
        productIngredients: productIngredients,
      };

      HttpService.getAxiosClient().put('/product', newProduct)
          .then(() => {
            this.isProductLoaded = false;
            this.getAllProduct();
          })
          .catch(error => {
            console.error(error);
          });
    },
    deleteProduct() {
      HttpService.getAxiosClient().delete(`/product/` + this.form.id)
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

