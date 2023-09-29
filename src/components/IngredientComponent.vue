<template>
  <v-container class="cart-container">
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="cart-card">
          <v-card-title class="text-center">Formulaire d'Ingrédient</v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="1">
                  <v-text-field v-model="form.id" label="id"></v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-text-field v-model="form.nom" label="Nom"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-textarea v-model="form.description" label="Description"></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="getIngredient()">Récupérer</v-btn>
            <v-btn color="primary" @click="createIngredient()">Créer</v-btn>
            <v-btn color="primary" @click="updateIngredient()">Modifier</v-btn>
            <v-btn color="primary" @click="deleteIngredient()">Supprimer</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-if="isIngredientLoaded" class="cart-container">
    <v-row justify="center">
      <v-col  cols="12">
        <v-row>
          <v-col v-for="Ingredient in allIngredient" :key="Ingredient.id" cols="12" sm="6" md="4">
            <v-card>
              <v-card-title class="text-center">{{ Ingredient.nom }}</v-card-title>
              <v-card-subtitle>{{ Ingredient.id }}</v-card-subtitle>
              <v-card-text>
                <v-row>
                  <v-col cols="12">{{ Ingredient.description }}</v-col>
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
      },
      allIngredient: [
        {
          id: '',
          nom: '',
          description: ''
        }
      ],
      isIngredientLoaded: false
    }
  },
  mounted() {
    this.getAllIngredient();
  },
  methods: {
    getAllIngredient() {
      bffAxios.get('/ingredient')
          .then(response => {
            this.allIngredient = response.data;
            this.isIngredientLoaded = true;
          })
          .catch(error => {
            console.error(error);
          });
    },
    getIngredient() {
      bffAxios.get('/ingredient/' + this.form.id)
          .then(response => {
            this.form.nom = response.data.nom;
            this.form.description = response.data.description;
          })
          .catch(error => {
            console.error(error);
          });
    },
    createIngredient() {
      const newIngredient = {
        nom: this.form.nom,
        description: this.form.description,
      };

      bffAxios.post('/ingredient', newIngredient)
          .then(() => {
            this.isIngredientLoaded = false;
            this.getAllIngredient();
          })
          .catch(error => {
            console.error(error);
          });
    },
    updateIngredient() {
      const newIngredient = {
        id: this.form.id,
        nom: this.form.nom,
        description: this.form.description
      };

      bffAxios.put('/ingredient', newIngredient)
          .then(() => {
            this.isIngredientLoaded = false;
            this.getAllIngredient();
          })
          .catch(error => {
            console.error(error);
          });
    },
    deleteIngredient() {
      bffAxios.delete(`/ingredient/` + this.form.id)
          .then(() => {
            this.isIngredientLoaded = false;
            this.getAllIngredient();
          })
          .catch(error => {
            console.error(error);
          });
    }
  },
};
</script>

