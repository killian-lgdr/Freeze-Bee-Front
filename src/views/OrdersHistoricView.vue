<template>
  <OrdersHistoric/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import OrdersHistoric from "@/components/OrdersHistoric.vue"; // @ is an alias to /src

@Options({
  components: {
    OrdersHistoric
  },

})
export default class OrdersHistoricView extends Vue {}
</script>