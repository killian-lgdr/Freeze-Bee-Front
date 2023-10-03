<template>
  <v-container class="cart-container">
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="cart-card">
          <v-card-title class="text-center">Formulaire de process</v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="2">
                  <v-text-field v-model="form.id" label="id"></v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-text-field v-model="form.nom" label="Nom"></v-text-field>
                </v-col>
                <v-col v-if="isProductLoaded" cols="5">
                  <v-select
                      v-model="form.selectedProduct"
                      :items="form.productOptions"
                      label="Product"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-textarea v-model="form.description" label="Description"></v-textarea>
                </v-col>
                <v-col cols="6">
                  <v-textarea v-model="form.commentaire" label="Commentaire"></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="getProcess()">Récupérer</v-btn>
            <v-btn color="primary" @click="createProcess()">Créer</v-btn>
            <v-btn color="primary" @click="updateProcess()">Modifier</v-btn>
            <v-btn color="primary" @click="deleteProcess()">Supprimer</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container class="cart-container">
    <v-row justify="center">
      <v-col v-if="isProcessLoaded" cols="12">
        <v-row>
          <v-col v-for="process in allProcess" :key="process.id" cols="12" sm="6" md="4">
            <v-card>
              <v-card-title class="text-center">{{ process.nom }}</v-card-title>
              <v-card-subtitle>{{ process.id }}</v-card-subtitle>
              <v-card-text>
                <v-row>
                  <v-col cols="12">{{ process.product.nom }}</v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">{{ process.commentaire }}</v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">{{ process.description }}</v-col>
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

export default {
  data() {
    return {
      form: {
        id: '',
        nom: '',
        description: '',
        selectedProduct: '',
        productOptions: '',
        commentaire: ''
      },
      allProduct: null,
      allProcess: [
        {
          id: '',
          nom: '',
          description: '',
          product: {nom: ''},
          commentaire: ''
        }
      ],
      isProcessLoaded: false,
      isProductLoaded: false
    }
  },
  mounted() {
    this.getAllProcess();
  },
  methods: {
    getAllProcess() {
      HttpService.getAxiosClient().get('/product')
          .then(response => {
            this.allProducts = response.data;
            this.form.productOptions = response.data.map(product => product.nom);
            this.isProductLoaded = true;
          })
          .catch(error => {
            console.error(error);
          });
          HttpService.getAxiosClient().get('/process')
          .then(response => {
            this.allProcess = response.data;
            this.isProcessLoaded = true;
          })
          .catch(error => {
            console.error(error);
          });
    },
    getProcess() {
      HttpService.getAxiosClient().get('/process/' + this.form.id)
          .then(response => {
            const process = response.data;

            this.form.nom = process.nom;
            this.form.description = process.description;
            this.form.selectedProduct = process.product.nom;
            this.form.commentaire = process.commentaire;
          })
          .catch(error => {
            console.error(error);
          });
    },
    createProcess() {
      const newProcess = {
        nom: this.form.nom,
        description: this.form.description,
        product: this.allProducts.find(product => product.nom === this.form.selectedProduct),
        commentaire: this.form.commentaire
      };

      HttpService.getAxiosClient().post('/process', newProcess)
          .then(() => {
            this.isProcessLoaded = false;
            this.isProductLoaded = false;
            this.getAllProcess();
          })
          .catch(error => {
            console.error(error);
          });
    },
    updateProcess() {
      const newProcess = {
        id: this.form.id,
        nom: this.form.nom,
        description: this.form.description,
        product: this.allProducts.find(product => product.nom === this.form.selectedProduct),
        commentaire: this.form.commentaire
      };

      HttpService.getAxiosClient().put('/process', newProcess)
          .then(() => {
            this.isProcessLoaded = false;
            this.isProductLoaded = false;
            this.getAllProcess();
          })
          .catch(error => {
            console.error(error);
          });
    },
    deleteProcess() {
      HttpService.getAxiosClient().delete(`/process/` + this.form.id)
          .then(() => {
            this.isProcessLoaded = false;
            this.isProductLoaded = false;
            this.getAllProcess();
          })
          .catch(error => {
            console.error(error);
          });
    }
  },
};
</script>

