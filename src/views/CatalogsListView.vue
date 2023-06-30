<template>
  <CatalogsList/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CatalogsList from '@/components/CatalogsList.vue'; // @ is an alias to /src

@Options({
  components: {
    CatalogsList,
  },

})
export default class CatalogsListView extends Vue {}
</script>