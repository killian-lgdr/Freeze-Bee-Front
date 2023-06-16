<template>
  <AccountManagement/>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import AccountManagement from "@/components/AccountManagement.vue"; // @ is an alias to /src

@Options({
  components: {
    AccountManagement,
  },

})
export default class AccountManagementView extends Vue {
}
</script>