<template>
    <SignIn/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SignIn from '@/components/SignIn.vue'; // @ is an alias to /src

@Options({
  components: {
    SignIn,
  },
})
export default class SignInView extends Vue {}
</script>