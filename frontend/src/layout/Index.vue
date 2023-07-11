<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar :elevation="1">
      <v-row>
        <v-col>
          <v-sheet class="pa-2 ma-2" v-if="this.$vuetify.display.xs">
            <v-app-bar-nav-icon 
              @click.stop="toggleSidebar">
            </v-app-bar-nav-icon>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
              {{name}}
          </v-sheet>
        </v-col>
        <v-col >
          <v-sheet class="pa-2 ma-2" style="float:right">
            <v-icon icon="mdi-bell"></v-icon>
          </v-sheet>
        </v-col>
      </v-row>

    </v-app-bar>
    <navbar />   
    <v-main class="align-center justify-center" style="min-height: 300px">
      <app-main />
    </v-main>

 
    
  </v-layout>
</template>

<script>
import { AppMain, Navbar } from "./components/index.js";
import { mapGetters } from 'vuex'

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
  },
  data: () => ({
    drawer: true,
    rail: true
  }),
  methods: {
    toggleSidebar() {
      this.drawer = !this.drawer,
      this.emitter.emit("toggle-sidebar", this.drawer);
    }
  }
};
</script>
