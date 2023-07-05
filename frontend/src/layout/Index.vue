<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Application bar"></v-app-bar>
    <navbar />
    <v-main class="align-center justify-center" style="min-height: 300px">
      <app-main />
    </v-main>
  </v-layout>
</template>

<script>
import { AppMain, Navbar } from "./components/index.js";

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
  },
};
</script>
