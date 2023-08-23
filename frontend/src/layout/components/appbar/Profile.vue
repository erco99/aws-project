<template>
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
          <v-btn variant="text" to="/profile">Profile</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn variant="text" @click="handleLogout">Logout</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "Appbarprof",
  methods: {
    async handleLogout() {
      await this.$store.dispatch("user/logout");
      this.$router.push("/login");
    },
  }
}
</script>