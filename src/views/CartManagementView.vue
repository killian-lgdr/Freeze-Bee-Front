<template>
  <CartManagement/>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import CartManagement from "@/components/CartManagement.vue";
@Options({
  components: {
    CartManagement
  },
})
export default class CartManagementView extends Vue {
}
</script>