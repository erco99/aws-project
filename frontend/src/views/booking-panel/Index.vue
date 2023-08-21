<script>
import Field from "./components/Field.vue";
import DayPicker from "./components/DayPicker.vue";
import Weather from "@/views/booking-panel/components/weather/Weather.vue";
import io from "socket.io-client";
export default {
  mounted() {
    this.socket.on("week", (fields) => (this.fields = fields));
    this.socket.on("new-booking", (newBooking) => {
      this.loading = false;
      for (const field of this.fields) {
        if (field.name === newBooking.field) {
          let found = false;
          for (const bookingDay of field.bookingsPerDay) {
            if (bookingDay.day === newBooking.day) {
              found = true;
              bookingDay.bookings.push(newBooking.newBooking);
              break;
            }
          }
          if (!found) {
            field.bookingsPerDay.push({
              day: newBooking.day,
              bookings: [newBooking.newBooking],
            });
            break;
          }
        }
      }
    });
    this.socket.on("delete-booking", (deleteBooking) => {
      this.loading = false;
      for (const field of this.fields) {
        if (field.name === deleteBooking.field) {
          for (const bookingDay of field.bookingsPerDay) {
            if (bookingDay.day === deleteBooking.day) {
              for (let i = 0; i < bookingDay.bookings.length; i++) {
                if (
                  bookingDay.bookings[i].time.hours === deleteBooking.time.hours
                ) {
                  bookingDay.bookings.splice(i, 1);
                }
              }
              break;
            }
          }
          break;
        }
      }
    });
    this.socket.on("update-states", ({ states, field: fieldName }) => {
      this.loading = false;
      for (const field of this.fields) {
        if (field.name === fieldName) {
          field.state = states;
        }
      }
    });
    this.socket.on("new-notification", (data) => {
      if (data.owner === this.$store.getters.userEmail) {
        this.$store.commit("notifications/NEW_UNREAD");
      }
    });
    this.socket.on("error", (msg) => alert(msg));
    this.socket.on("new-transaction", (transactionData) => {
      const { transaction_type, amount, user } = transactionData;
      if (user.email === this.$store.getters.userEmail) {
        this.$store.commit('user/INC_USER_BALANCE', transaction_type === "negative" ? - amount : amount)
      }
    });
    this.socket.emit("get-week", this.day);

    // ask for position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.positionAcquired = { acquired: true, code: null };
      },
      (error) => {
        console.log(error);
        this.positionAcquired = { acquired: false, code: error.code };
      }
    );
  },
  unmounted() {
    this.socket.disconnect();
  },
  data() {
    return {
      loading: false,
      fields: [],
      day: null,
      socket: io("http://localhost:10000"),
      latitude: null,
      longitude: null,
      positionAcquired: {
        acquired: false,
        code: null,
      },
    };
  },
  components: { Field, DayPicker, Weather },
  methods: {
    book(newBooking) {
      this.loading = true;
      this.socket.emit("new-booking", newBooking);
    },
    deleteBook(deleteBooking) {
      this.loading = true;
      this.socket.emit("delete-booking", deleteBooking);
    },
    updateStates(states) {
      this.loading = true;
      this.socket.emit("update-states", states);
    },
  },
};
</script>

<template>
  <div class="mx-auto">
    <DayPicker @day-update="(newDay) => (day = newDay)"></DayPicker>
    <v-card :loading="loading" class="mx-auto mt-4 mb-4" elevation="4">
      <div class="overflow-x-auto px-4 py-2">
        <div class="py-2" v-for="field in fields" :key="field.name">
          <Field
            :name="field.name"
            :bookings="field.bookingsPerDay"
            :closing="field.closing"
            :opening="field.opening"
            :minutes="field.minutes"
            :state="field.state"
            :surface="field.surface"
            :day="day"
            @new-booking="book"
            @delete-booking="deleteBook"
            @update-states="updateStates" />
        </div>
      </div>
    </v-card>
  </div>
  <!--  <div style="height: 50px"></div>-->
  <Weather
    :day="day"
    :latitude="latitude"
    :longitude="longitude"
    :positionAcquired="positionAcquired"></Weather>
</template>
