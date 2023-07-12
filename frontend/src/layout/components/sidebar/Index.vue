<template>
  <v-navigation-drawer
    elevation="3"
    v-model="drawer"
    :rail="rail"
    :temporary="temporary"
    :permanent="permanent"
    @click="railNotMobile"
    style="margin:15px"
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      title="John Leider"
      nav
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
          v-if="this.$vuetify.display.xs != true"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
      <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
      <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Item from "./Item.vue";

export default {
  data: () => ({
    items: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
    ],
    drawer: true,
    permanent: false,
    temporary: false,
    rail: false
  }),
  mounted() { 
    this.emitter.on("toggle-sidebar", drawer => {
      this.drawer = drawer;
    });
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
    if(this.$vuetify.display.xs) {
        this.drawer = false;
        this.temporary = true;
        this.permanent = false;
      } else {
        this.drawer = true;
        this.temporary = false;
        this.permanent = true;
      }
  },
  methods: {
    onResize() {
      if(this.$vuetify.display.xs) {
        this.drawer = false;
        this.temporary = true;
        this.permanent = false;
        this.rail = false;
      } else {
        this.drawer = true;
        this.temporary = false;
        this.permanent = true;
      }
    },
    railNotMobile() {
      if(this.$vuetify.display.xs != true) {
        this.rail = !this.rail
      }
    }
  }
};
</script>