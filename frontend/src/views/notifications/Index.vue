<template>
  <v-row>
    <v-col
      v-for="(notification, index) in notifications"
      :key="index"
      cols="12"
      sm="6">
      <v-card height="280">
        <v-img
          height="50"
          src="https://random.imagecdn.app/50/150"
          cover
          class="text-white"></v-img>
        <v-card-title>{{ notification.title }}</v-card-title>
        <v-card-subtitle>{{ notification.subtitle }}</v-card-subtitle>
        <v-card-text>{{ notification.text }}</v-card-text>
        <v-card-actions v-if="notification.expiration">
          <v-btn>Accetta</v-btn>
          <v-btn>Rifiuta</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      notifications: [],
      socket: io("http://localhost:10000"),
    };
  },
  mounted() {
    this.socket.on("notifications", (notifications) => {
      this.notifications = notifications;
      console.log(notifications);
    });
    this.socket.emit("getNotifications", this.$store.getters.userEmail);
  },
  unmounted() {
    this.socket.disconnect();
  },
};
</script>
