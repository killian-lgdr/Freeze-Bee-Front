<template>
  <v-app>
    <v-app-bar color="primary" app>
      <v-btn to="/">
        <v-toolbar-title>Killer Bee ERP</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn to="/process">
        Process
      </v-btn>
      <v-btn to="/product">
        Products
      </v-btn>
      <v-btn to="/ingredient">
        Ingredients
      </v-btn>
      <v-btn to="/login">
        Userinfos
      </v-btn>
      <v-btn icon @click="LogOut()">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container class="d-flex align-center justify-center">
      <v-main>
        <router-view/>
      </v-main>
    </v-container>

  </v-app>
</template>

<script>
import KeyCloakService from "@/security/Keycloakservice";

export default {
  name: 'App',
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    LogOut() {
      return KeyCloakService.CallLogOut();
    },
  }
};
</script>