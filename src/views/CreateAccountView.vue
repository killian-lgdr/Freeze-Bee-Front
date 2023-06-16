<template>
  <CreateAccount/>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import CreateAccount from "@/components/CreateAccount.vue"; // @ is an alias to /src

@Options({
  components: {
    CreateAccount,

  },

})
export default class CreateAccountView extends Vue {
}
</script>