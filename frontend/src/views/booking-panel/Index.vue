<script>
import Field from "./components/Field.vue";
import DayPicker from "./components/DayPicker.vue";
import Weather from "@/views/booking-panel/components/weather/Weather.vue";
import io from "socket.io-client";
export default {
  mounted() {
    this.socket.on("week", (fields) => (this.fields = fields));
    this.socket.on("new-booking", (newBooking) => {
      console.log(newBooking);
      this.loading = false;
    });
    this.socket.on("error", (msg) => console.log(msg));
    this.socket.emit("get-week", this.day);

    // ask for position
    navigator.geolocation.getCurrentPosition(
        position => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.positionAcquired = {acquired: true, code: null};
        },
        error => {
          console.log(error)
          this.positionAcquired = {acquired: false, code: error.code};
        }
    )
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
        code: null
      }
    };
  },
  components: { Field, DayPicker, Weather },
  methods: {
    book(newBooking) {
      this.loading = true;
      this.socket.emit("new-booking", newBooking);
    },
  },
};
</script>

<template>
  <div class="mx-auto">
    <DayPicker @day-update="(newDay) => (day = newDay)"></DayPicker>
    <v-card :loading="loading" class="mx-auto mt-4 mb-4" elevation="4">
      <div class="overflow-x-auto">
        <div class="p-2" v-for="field in fields" :key="field.name">
          <Field
            :name="field.name"
            :bookings="field.bookings"
            :closing="field.closing"
            :opening="field.opening"
            :minutes="field.minutes"
            :state="field.state"
            :surface="field.surface"
            :day="day.toISOString()"
            @new-booking="book" />
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
