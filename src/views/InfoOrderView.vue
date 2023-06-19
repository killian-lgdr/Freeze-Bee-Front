<template>
  <InfoOrder/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import InfoOrder from "@/components/InfoOrder.vue"; // @ is an alias to /src

@Options({
  components: {
    InfoOrder
  },

})
export default class InfoCommandView extends Vue {}
</script>