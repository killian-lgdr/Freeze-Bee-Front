<template>
  <v-row>
    <v-col cols="12" sm="8" md="6">
      <h2>Orders historic</h2>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" v-for="order in orders" :key="order.id">
      <v-card class="text-center">
        <v-card-title>{{ order.restorer.name }}</v-card-title>
        <v-card-subtitle>For {{order.user.name}}</v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col cols="6"><v-chip color="primary">{{ order.status }}</v-chip></v-col>
            <v-col cols="6"><v-chip color="primary">{{ order.date }}</v-chip></v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-title>Addresses</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">Restorer: {{ order.restorer.address }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">User: {{ order.user.address }}</v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row justify-sm="center">
            <v-col xxl="3" xl="3" lg="3" md="3" sm="6" xs="6" v-for="menu in order.menus" :key="menu.id">
              <v-card>
                <v-img
                    :src="menu.image"
                    height="200px"
                ></v-img>
                <v-card-title>{{ menu.name }}</v-card-title>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">amount: {{ order.amount }}</v-col>
          </v-row>
        </v-card-text>
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
      orders: [
        {
          status: '',
          date: '',
          amount: '',
          restorer:{
            id: '',
            name: '',
            address: ''
          },
          user:{
            id: '',
            name: '',
            address: ''
          },
          menus:[
            {
              id: '',
              image: '',
              name: ''
            },
            {
              id: '',
              image: '',
              name: ''
            }
          ]
        },

      ],
      isOrdersLoaded: true
    }
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    fetchOrders() {
      store.commit('showSnackbarinfo', {
        message: 'Recovering orders...',
        color: 'info',
      });
      bffAxios.get('/myorders')
          .then(response => {
            this.orders = response.data;
            this.isCartLoaded = true;
            store.commit('showSnackbarinfo', {
              message: 'Orders recovered',
              color: 'success',
            });
          })
          .catch(error => {
            console.error(error);
            store.commit('showSnackbarinfo', {
              message: 'Orders failed',
              color: 'error',
            });
          });
    }
  },
};
</script>