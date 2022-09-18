<template>
  <v-app>
    <app-bar />
    <v-main>
      <v-container fluid>
        <router-view :key="$route.path" />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import AppBar from "@components/AppBar.vue";
export default {
  name: "LoggedAreaLayout",
  components: {
    AppBar,
  },
};
</script>
