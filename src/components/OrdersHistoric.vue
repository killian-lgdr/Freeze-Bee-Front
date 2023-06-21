<template>
  <v-row>
    <v-col cols="12" sm="8" md="6">
      <h2>Orders historic</h2>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" v-for="order in orders" :key="order.id">
      <v-card>
        <v-card-title class="test-center">{{ order.restorer.name }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">{{ order.status }}</v-col>
            <v-col cols="6">{{ order.date }}</v-col>
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
          <v-row>
            <v-col cols="12" v-for="menu in order.menus" :key="menu.id">
              <v-card>
                <v-img
                    :src="menu.image"
                    height="200px"
                    cover
                ></v-img>
                <v-card-title>{{ menu.name }}</v-card-title>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">Price: {{ order.amount }}</v-col>
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
          name: '',
          status: '',
          date: '',
          amount: '',
          restorer:{
            id: '',
            address: ''
          },
          user:{
            id: '',
            address: ''
          },
          menus:[
            {
              id: '',
              name: ''
            }
          ]
        }
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
      bffAxios.get('/mycart')
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