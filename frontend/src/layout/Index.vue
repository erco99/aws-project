<template>
  <v-layout
    class="rounded rounded-md"
    style="display: block"
    v-if="dataReady"
    v-model="dataReady"
  >
    <v-app-bar class="" :elevation="2">
      <v-row>
        <v-col>
          <v-sheet
            class="pa-2 ma-2"
            v-if="this.$vuetify.display.xs"
            style="float: left"
          >
            <v-app-bar-nav-icon @click.stop="toggleSidebar">
            </v-app-bar-nav-icon>
          </v-sheet>
        </v-col>
        <v-col
        xs="1"
          class="align-center">
          <v-sheet class="pa-2 ma-2">
            <v-img
              :width="60"
              aspect-ratio="16/9"
              cover
              src="src/assets/logo/logo_alone.png"
              v-if="this.$vuetify.display.xs"
            ></v-img>
            <v-img
              :width="200"
              aspect-ratio="16/9"
              cover
              src="src/assets/logo/logo_transparent.png"
              v-else
            ></v-img>
          </v-sheet>
        </v-col>

        <v-col 
        xs="5"
        sm="3">
          <v-sheet class="pa-2 ma-2" style="float: right">
            <v-icon icon="mdi-bell"></v-icon>
            <div
              class="text-center"
              style="display: inline-block; margin: 0px 10px 0px 20px"
            >
              <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" icon="mdi-account"> </v-icon>
                </template>
                <v-list>
                  <v-list-item>
                    <v-btn variant="text" @click="handleLogout">Logout</v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-app-bar>
    <navbar />
    <v-main
      class="align-center justify-center"
      style="min-height: 300px; margin: 30px"
    >
      <app-main />
    </v-main>
  </v-layout>
</template>

<script>
import { AppMain, Navbar } from "./components/index.js";
import { mapGetters } from "vuex";

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
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
    async handleLogout() {
      await this.$store.dispatch("user/logout");
      this.$router.push("/login");
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