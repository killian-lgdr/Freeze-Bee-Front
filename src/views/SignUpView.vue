<template>
  <SignUp/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SignUp from '@/components/SignUp.vue'; // @ is an alias to /src

@Options({
  components: {
    SignUp,
  },

})
export default class SignUpView extends Vue {}
</script>