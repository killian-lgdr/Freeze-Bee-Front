<template>
  <v-app>
    <v-app-bar color="primary" app>
      <v-btn to="/">
        <v-toolbar-title>CESI Eats</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn to="/process" icon>
        <v-icon>mdi-silverware-fork-knife</v-icon>
      </v-btn>
      <v-btn to="/product" icon>
        <v-icon>mdi-silverware-fork-knife</v-icon>
      </v-btn>
      <v-btn to="/" icon>
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
export default {
  name: 'App',
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>