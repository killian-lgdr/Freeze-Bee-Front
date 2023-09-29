<template>
  <IngredientComponent/>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import IngredientComponent from "@/components/IngredientComponent.vue";
@Options({
  components: {
    IngredientComponent
  },
})
export default class IngredientView extends Vue {
}
</script>