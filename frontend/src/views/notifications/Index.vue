<template>
  <v-row>
    <v-col
      v-for="(notification, index) in notifications"
      :key="index"
      cols="12"
      sm="6">
      <v-card :height="cardHeight(notification)" :color="cardColor(notification)">
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
      currentNotificationPerPage: 0,
    };
  },
  setup() {
    const display = useDisplay();

    return { display };
  },
  mounted() {
    this.socket.on("notifications", (notifications) => {
      this.notifications.push(...notifications);
      this.currentNotificationPerPage = this.currentNotificationPerPage + notifications.length;
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
    this.socket.on("new-transaction", (transactionData) => {
      const { transaction_type, amount, user } = transactionData;
      if (user.email === this.$store.getters.userEmail) {
        this.$store.commit('user/INC_USER_BALANCE', transaction_type === "negative" ? - amount : amount)
      }
    });
    // Register callback for load new notifications
    this.loadNextNotifications()
    // Load first 'notificationPerPage' notifications
    this.socket.emit("getNotifications", { owner: this.$store.getters.userEmail, from: 0, to: this.notificationPerPage });
    this.$store.commit("notifications/DECR_UNREAD", this.notificationPerPage);
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
      // Workaround to get live update of notification color when accept
      notification.type = "invitation accepted";
      this.$forceUpdate();
    },
    handleInvitation(notification) {
      Object.defineProperty(notification, 'color', { value: 'warning' })
      // Add element to the beginning because it is newer
      this.notifications.unshift(notification);
      // Set notification to read
      this.$store.dispatch('user/setNotificationToRead', notification);
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
    },
    cardColor(notification) {
      switch (notification.type) {
        case "owner invitation":
        case "invitation accepted":
          return "green-lighten-1";
        case "player invitation":
          return "deep-orange-lighten-1";
        case "delete":
          return "red-lighten-1";
        default:
          return "white";
      }
    },
    loadNextNotifications() {
      window.onscroll = () => {
        const app = document.getElementById("app");
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight - 15 === app.scrollHeight;
        if (bottomOfWindow) {
          this.socket.emit("getNotifications", {
            owner: this.$store.getters.userEmail,
            from: this.currentNotificationPerPage,
            to: this.currentNotificationPerPage + this.notificationPerPage });
          this.$store.commit("notifications/DECR_UNREAD", this.notificationPerPage);
        }
      }
    }
  },
  computed: {
    notificationPerPage() {
      switch (this.display.name.value) {
        default: return 10
      }
    }
  }
};
</script>
