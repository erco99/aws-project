<template>
  <v-layout
    class="rounded rounded-md"
    style="display: block"
    v-if="dataReady"
    v-model="dataReady"
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
    dataReady: false,
  }),
  methods: {
    toggleSidebar() {
      this.drawer = !this.drawer;
      this.emitter.emit("toggle-sidebar", this.drawer);
    },
  },
  async beforeMount() {
    await this.$store.dispatch("user/user");
    this.dataReady = true;
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