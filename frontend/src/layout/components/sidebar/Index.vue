<template>
  <v-navigation-drawer
    elevation="4"
    v-model="drawer"
    :rail="rail"
    :temporary="temporary"
    :permanent="permanent"
    style="margin:15px"
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      :title="this.$store.getters.userFullname"
      nav
      @click="railNotMobile"
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
      <v-list-item 
        v-for="route in routes"
        :key="route.path"
        :title="route.name"
        :to="route.path"
        color="green-darken-3"
        :prepend-icon="route.icon"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Item from "./Item.vue";
import { mapGetters } from 'vuex'

export default {
  components: { Item },
  computed: {
    ...mapGetters([
      'routes'
    ]),
  },
  data: () => ({
    drawer: true,
    permanent: false,
    temporary: false,
    rail: false
  }),
  mounted() { 
    this.emitter.on("toggle-sidebar", drawer => {
      this.drawer = !this.drawer;
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