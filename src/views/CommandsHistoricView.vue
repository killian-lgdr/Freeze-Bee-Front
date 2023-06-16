<template>
  <CommandsHistoric/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CommandsHistoric from "@/components/CommandsHistoric.vue"; // @ is an alias to /src

@Options({
  components: {
    CommandsHistoric,

  },

})
export default class CommandHistoricView extends Vue {}
</script>