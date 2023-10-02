<template>
  <v-container class="login-container">
    <h2>Login : {{ Login() }}</h2>
    <h2>Roles : {{ UserRoles()?.join(" ") }}</h2>
    <h2>Access Token : {{ AccessToken() }}</h2>
  </v-container>
</template>

<script lang="ts">
import KeyCloakService from "@/security/Keycloakservice";

export default {
  methods: {
    Login() {
      return KeyCloakService.GetUserName();
    },
    AccessToken() {
      return KeyCloakService.GetAccesToken();
    },
    UserRoles() {
      return KeyCloakService.GetUserRoles();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>