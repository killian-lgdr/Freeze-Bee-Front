<template>
  <v-container class="cart-container">
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="cart-card">
          <v-card-title class="text-center">Payment</v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="12">
                  <v-select
                      v-model="selectedPayment"
                      :items="paymentOptions"
                      label="Payment Method"
                  ></v-select>
                </v-col>
              </v-row>

              <template v-if="selectedPayment === 'Carte Bancaire'">
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="cardNumber" label="Card Number"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="cardholderName" label="Cardholder Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="expirationDate" label="Expiration Date"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="cvv" label="CVV"></v-text-field>
                  </v-col>
                </v-row>
              </template>

              <template v-else-if="selectedPayment === 'PayPal'">
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="paypalEmail" label="Email"></v-text-field>
                  </v-col>
                </v-row>
              </template>

              <template v-else-if="selectedPayment === 'Western Union'">
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="recipientName" label="Recipient Name"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-textarea v-model="address" label="Address"></v-textarea>
                  </v-col>
                </v-row>
              </template>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="order()" :to="`/orders`">Order</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { store } from "@/services/store";
import {bffAxios} from "@/services/axios";

export default {
  props: {
    cartId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedPayment: 'Carte Bancaire',
      paymentOptions: ['Carte Bancaire', 'PayPal', 'Western Union'],
      cardNumber: '',
      cardholderName: '',
      expirationDate: '',
      cvv: '',
      paypalEmail: '',
      recipientName: '',
      address: '',
    };
  },
  methods: {
    order() {
      store.commit("showSnackbar", {
        message: "Creating order...",
        color: "info",
      });
      bffAxios.post("/orders", { cartId: this.cartId }) // Envoyer l'ID du panier dans la requête
          .then(() => {
            store.commit("showSnackbar", {
              message: "Order created",
              color: "success",
            });
          })
          .catch(() => {
            store.commit("showSnackbar", {
              message: "Creation failed",
              color: "error",
            });
          });
    },
  },
};
</script>
