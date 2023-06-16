<template>
  <InfoMenu/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import InfoMenu from '@/components/InfoMenu.vue'; // @ is an alias to /src

@Options({
  components: {
    InfoMenu,
  },

})
export default class InfoMenuView extends Vue {}
</script>