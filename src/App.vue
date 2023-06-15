<template>
  <v-app>
    <v-app-bar color="primary" app>
      <v-toolbar-title>CESI Eats</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/login" text>Sign In</v-btn>
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

  data: () => ({
    //
  }),
}
</script>
<style>
body{
  font-family: 'Roboto', sans-serif;
}
.align-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}
</style>