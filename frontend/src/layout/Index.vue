<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Application bar">
        <template v-slot:prepend >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
    </v-app-bar>
    <navbar />   
    <v-main class="align-center justify-center" style="min-height: 300px">
      <div v-if="this.$vuetify.display.xl">
        prova
      </div>
      <app-main />
    </v-main>

 
    
  </v-layout>
</template>

<script>
import { AppMain, Navbar } from "./components/index.js";
import { mapState } from 'vuex'

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
  },
};
</script>
