<template>
  <InfoCommand/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import InfoCommand from '@/components/InfoCommand.vue'; // @ is an alias to /src

@Options({
  components: {
    InfoCommand,
  },

})
export default class InfoCommandView extends Vue {}
</script>