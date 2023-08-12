<template>
  <v-layout
    class="rounded rounded-md"
    style="display: block"
  >
  <appbar />
  <sidebar />
  <v-main
    class="align-center justify-center"
    style="min-height: 300px; margin: 15px 15px 20px 25px"
  >
    <app-main />
  </v-main>
  </v-layout>
</template>

<script>
import { AppMain, Sidebar, Appbar } from "./components/index.js";
import { mapGetters } from "vuex";

export default {
  name: "Layout",
  components: {
    AppMain,
    Sidebar,
    Appbar,
  },
  computed: {
    ...mapGetters(["name"]),
  },
  data: () => ({
    drawer: true,
    rail: true,
    items: [{ title: "Logout" }],
  }),
  methods: {
    toggleSidebar() {
      this.drawer = !this.drawer;
      this.emitter.emit("toggle-sidebar", this.drawer);
    },
  },
};
</script>

<style>
.v-col {
  align-self: center;
}

.v-col > div {
  text-align: center;
}
</style>