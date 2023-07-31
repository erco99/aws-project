<script>
import Header from "./dialog/Header.vue";
import Body from "./dialog/Body.vue";
import HourButton from "./HourButton.vue";
import { stringfy } from "./commons";
export default {
  setup() {
    return { stringfy };
  },
  components: { Body, Header, HourButton },
  emits: ["newBooking"],
  props: {
    state: { type: Array, default: [] },
    name: { type: String, required: true },
    opening: { type: Number, required: true },
    closing: { type: Number, required: true },
    minutes: { type: Number, required: true },
    surface: String,
    bookings: { type: Array, default: [] },
    day: { type: String, default: new Date().toISOString() },
  },
  data() {
    return {
      duration: 0,
      match: "",
      newBooking: {
        hour: {},
        owner: {
          name: this.$store.getters.userName,
          surname: this.$store.getters.userSurname,
          emai: this.$store.getters.userEmail,
        },
        players: [],
        servicies: [],
      },
      dialog: false,
    };
  },
  computed: {
    currentDayBookings() {
      for (const bookingDay of this.bookings) {
        if (bookingDay.day == this.day) {
          return bookingDay.bookings;
        }
      }
      return [];
    },
    isNextFree() {
      return !this.currentDayBookings.some(
        (e) => e.time.hours == this.newBooking.hour.hours + 1
      );
    },
    inside() {
      return this.state.includes("coperto");
    },
  },
  methods: {
    notifyNewBooking() {
      if (
        (this.match == "single" && this.newBooking.players.length != 1) ||
        (this.match == "double" && this.newBooking.players.length != 3)
      ) {
        alert("Il numero di partecipanti non è valido");
      } else {
        const newBooking = [];
        for (let i = 0; i < this.duration; i++) {
          const pushMe = this.newBooking;
          pushMe.hour.hours += i;
          newBooking.push(pushMe);
        }
        this.$emit("newBooking", newBooking);
        this.dialog = false;
      }
    },
    hourButtonProps(hour) {
      for (const book of this.currentDayBookings) {
        if (book.time.hours == hour) {
          return {
            text: book.owner.name.concat(" ", book.owner.surname),
            disabled: true,
          };
        }
      }
      return { text: stringfy(hour, this.minutes), disabled: false };
    },
    book(hour) {
      this.duration = 1;
      this.match = "single";
      this.newBooking.hour = hour;
      this.newBooking.servicies = this.defaultServices(hour.hours, this.inside);
      this.dialog = true;
    },
    defaultServices(time, inside) {
      const today = new Date(this.day);
      const month = today.getMonth();
      switch (month) {
        case 1:
        case 2:
        case 10:
        case 11:
        case 12:
          if (inside) {
            return ["lighting", "heating"];
          } else if (time >= 17) {
            return ["lighting"];
          }
          return [];
        case 3:
        case 4:
        case 9:
          if (inside || time >= 18) {
            return ["lighting"];
          }
          return [];
        case 5:
        case 8:
          if (inside || time >= 19) {
            return ["lighting"];
          }
          return [];
        case 6:
        case 7:
          if (inside || time >= 20) {
            return ["lighting"];
          }
          return [];
      }
    },
  },
};
</script>

<template>
  <div class="fit-content pr-10">
    <div class="d-flex align-end mb-2 sticky">
      <v-chip class="mr-2" variant="outlined">{{ name }}</v-chip>
      <v-chip
        v-for="(key, index) in state"
        :key="index"
        variant="outlined"
        size="small"
        >{{ key }}</v-chip
      >
    </div>
    <div class="d-flex">
      <HourButton
        v-for="n in closing - opening + 1"
        :key="n"
        v-bind="hourButtonProps(opening + n - 1)"
        @click="
          book({ hours: opening + n - 1, minutes: minutes })
        "></HourButton>
    </div>
  </div>
  <v-dialog v-model="dialog" scrollable width="1024"
    ><v-card>
      <Header
        :hours="newBooking.hour.hours"
        :minutes="newBooking.hour.minutes"
        :name="name"
        :day="day"></Header>
      <Body
        :next="isNextFree"
        :defaultDuration="1"
        defaultMatch="single"
        :inside="inside"
        :defaultServicies="newBooking.servicies"
        @duration-update="(value) => (duration = value)"
        @match-update="(value) => (match = value)"
        @servicies-update="(value) => (newBooking.servicies = value)"
        @players-update="(value) => (newBooking.players = value)"></Body>
      <v-card-actions class="justify-center">
        <v-btn color="primary" @click="dialog = false">Annulla</v-btn>
        <v-btn color="primary" @click="notifyNewBooking()">Prenota ora</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.fit-content {
  width: fit-content;
}
.sticky {
  width: fit-content;
  position: sticky;
  position: -webkit-sticky;
  left: 0;
}
</style>
