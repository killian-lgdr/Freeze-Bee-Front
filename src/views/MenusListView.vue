<template>
  <MenusList/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MenusList from '@/components/MenusList.vue'; // @ is an alias to /src

@Options({
  components: {
    MenusList,
  },

})
export default class MenusListView extends Vue {}
</script>