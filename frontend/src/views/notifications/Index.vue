<template>
  <v-row>
    <v-col
      v-for="(notification, index) in notifications"
      :key="index"
      cols="12"
      sm="6">
      <v-card :height="cardHeight(notification)">
        <v-card-title>{{ notification.title }}</v-card-title>
        <v-card-subtitle>{{ notification.subtitle }}</v-card-subtitle>
        <v-card-text>{{ notification.text }}</v-card-text>
        <v-card-actions
          v-if="displayCardActions(notification)">
          <v-btn @click="accept(notification)">Accetta</v-btn>
          <v-btn @click="refuse(notification._id)">Rifiuta</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import io from "socket.io-client";
import {useDisplay} from "vuetify";
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
    this.socket.on("delete-booking", (deleteBooking) => {
      this.updateUserBalance(deleteBooking, '+')
    })
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
      this.updateUserBalance(newBooking.newBooking, '-')
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
    updateUserBalance(data, sign) {
      const userEmail = this.$store.getters.userEmail
      if (data.owner && data.owner.email === userEmail || data.inviter && data.inviter === userEmail) {
        this.$store.commit('user/INC_USER_BALANCE', sign === '-' ?  - data.price : data.price)
      }
      const playersEmails = []
      if (data.players) {
        playersEmails.push(...data.players.map(player => player.email))
      } else if (data.owners) {
        playersEmails.push(...data.owners)
      }
      if (playersEmails.includes(userEmail) && !data.myTreat) {
        this.$store.commit('user/INC_USER_BALANCE', sign === '-' ?  - data.price : data.price);
      }
      this.balance = this.$store.getters.userBalance;
    },
    displayCardActions(notification) {
      return new Date(notification.expiration) > new Date() &&
          !notification.accepters.includes(this.$store.getters.userEmail)
    },
    cardHeight(notification) {
      if (this.displayCardActions(notification)) {
        const display = useDisplay();
        // TODO: Make more precise
        if (display.width._object.width <= 1200) return 280;
        else return 220;
      } else {
        return 220;
      }
    }
  },
};
</script>
