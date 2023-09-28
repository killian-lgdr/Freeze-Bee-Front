<template>
  <ProcessComponent/>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import ProcessComponent from "@/components/ProcessComponent.vue";
@Options({
  components: {
    ProcessComponent
  },
})
export default class ProcessView extends Vue {
}
</script>