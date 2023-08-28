<template>
  <v-badge
      v-if="this.$store.getters.unreadNotifications"
      :content="this.notificationsNumber"
      color="info">
    <v-icon icon="mdi-bell" @click="this.$router.push({path: '/notifications'})"></v-icon>
  </v-badge>
  <v-icon v-else icon="mdi-bell" @click="this.$router.push({path: '/notifications'})"></v-icon>
</template>

<script>
export default {
  name: "Appbarnots",
  computed: {
    notificationsNumber() {
      const unreadNotificationsNumber = this.$store.getters.unreadNotificationsNumber;
      return unreadNotificationsNumber < 99 ? unreadNotificationsNumber : "99+";
    }
  },
  async mounted() {
    await this.$store.dispatch('user/getAllUnreadNotifications');
  }
}
</script>