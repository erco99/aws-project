<template>
  <v-row>
    <v-col
      v-for="(notification, index) in notifications"
      :key="index"
      cols="12"
      sm="6">
      <v-card height="220">
        <v-card-title>{{ notification.title }}</v-card-title>
        <v-card-subtitle>{{ notification.subtitle }}</v-card-subtitle>
        <v-card-text>{{ notification.text }}</v-card-text>
        <v-card-actions
          v-if="
            new Date(notification.expiration) > new Date() &&
            !notification.accepters.includes(this.$store.getters.userEmail)
          ">
          <v-btn @click="accept(notification)">Accetta</v-btn>
          <v-btn @click="refuse(notification._id)">Rifiuta</v-btn>
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
    });
    this.socket.on("new-booking", (newBooking) =>
      this.handleNewBooking(newBooking)
    );
    this.socket.on("refuse", (invitation) => this.handleRefuse(invitation));
    this.socket.on("refresh", (notification) =>
      this.handleRefresh(notification)
    );
    this.socket.on("invitation", (notification) =>
      this.handleInvitation(notification)
    );
    this.socket.emit("getNotifications", this.$store.getters.userEmail);
  },
  unmounted() {
    this.socket.disconnect();
  },
  methods: {
    refuse(notificationId) {
      this.socket.emit("refuse", notificationId, new Date().toISOString());
    },
    accept(notification) {
      this.socket.emit(
        "accept",
        notification._id,
        this.$store.getters.userEmail
      );
      notification.accepters.push(this.$store.getters.userEmail);
    },
    handleInvitation(notification) {
      this.notifications.push(notification);
    },
    handleRefresh(notification) {
      for (let i = 0; i < this.notifications.length; i++) {
        if (this.notifications[i]._id === notification._id) {
          this.notifications.splice(i, 1, notification);
          break;
        }
      }
    },
    handleRefuse(invitation) {
      if (invitation.owners.includes(this.$store.getters.userEmail)) {
        this.socket.emit("getRefresh", invitation.id);
        this.socket.emit("getDelete", invitation.id);
      } else if (invitation.inviter === this.$store.getters.userEmail) {
        this.socket.emit("getDelete", invitation.id);
      }
    },
    handleNewBooking(newBooking) {
      if (
        newBooking.newBooking.players.some(
          (p) => p.email === this.$store.getters.userEmail
        )
      ) {
        this.socket.emit("getInvitation", {
          day: newBooking.day,
          field: newBooking.field,
          time: newBooking.newBooking.time,
        });
      }
    },
  },
};
</script>
