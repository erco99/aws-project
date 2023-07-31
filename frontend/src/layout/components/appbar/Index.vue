<template>
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
    <logo />
    </v-col>

    <v-col 
      xs="5"
      sm="3">
      <v-sheet class="pa-2 ma-2" style="float: right">
        <notifications />
        <profile />
      </v-sheet>
    </v-col>
  </v-row>
</v-app-bar>
</template>

<script>
import Logo from "./Logo.vue";
import Notifications from "./Notifications.vue"
import Profile from "./Profile.vue"

export default {
  components: {
    Logo,
    Notifications,
    Profile
  }
}


</script>