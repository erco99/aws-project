<script>
import Header from "./dialog/Header.vue";
import Body from "./dialog/Body.vue";
import HourButton from "./HourButton.vue";
import AdminDialog from "./admin-dialog/AdminDialog.vue";
import { stringfy, domainDate } from "./commons";
export default {
  setup() {
    return { stringfy };
  },
  components: { Body, Header, HourButton, AdminDialog },
  emits: ["newBooking", "deleteBooking"],
  props: {
    state: { type: Array, default: [] },
    name: { type: String, required: true },
    opening: { type: Number, required: true },
    closing: { type: Number, required: true },
    minutes: { type: Number, required: true },
    surface: String,
    bookings: { type: Array, default: [] },
    day: { type: String, default: domainDate(new Date()) },
  },
  data() {
    return {
      duration: 0,
      match: "",
      newBooking: {
        time: {},
        owner: {
          name: this.$store.getters.userName,
          surname: this.$store.getters.userSurname,
          email: this.$store.getters.userEmail,
        },
        players: [],
        servicies: [],
      },
      dialog: false,
      adminDialog: false,
      deleteTime: {},
    };
  },
  watch: {
    bookings: {
      handler: function (_newValue) {
        if (this.dialog) {
          this.dialog = false;
          alert("L'ora che stavi cercando di prenotare non è più disponibile");
        }
      },
      deep: true,
    },
  },
  computed: {
    currentDayBookings() {
      for (const bookingDay of this.bookings) {
        if (bookingDay.day === this.day) {
          return bookingDay.bookings;
        }
      }
      return [];
    },
    isNextFree() {
      return !this.currentDayBookings.some(
        (e) => e.time.hours == this.newBooking.time.hours + 1
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
          const pushMe = {
            field: this.name,
            day: this.day,
            time: {
              hours: this.newBooking.time.hours + i,
              minutes: this.newBooking.time.minutes,
            },
            players: this.newBooking.players,
            owner: this.newBooking.owner,
          };
          newBooking.push(pushMe);
        }
        this.$emit("newBooking", newBooking);
        this.dialog = false;
      }
    },
    hourButtonProps(hour) {
      for (const book of this.currentDayBookings) {
        if (book.time.hours == hour) {
          let text;
          if (book.players.length === 3) {
            text = [book.owner.surname, ...book.players.map((p) => p.surname)];
          } else {
            text = [
              ,
              book.owner.surname,
              ...book.players.map((p) => p.surname),
            ];
          }
          return {
            text: text,
            disabled: true,
          };
        }
      }
      return { text: [, stringfy(hour, this.minutes)], disabled: false };
    },
    book(time) {
      if (
        this.$store.getters.userRole === "admin" &&
        this.hourButtonProps(time.hours).disabled
      ) {
        this.deleteTime = time;
        this.adminDialog = true;
      } else {
        this.duration = 1;
        this.match = "single";
        this.newBooking.time = time;
        this.newBooking.servicies = this.defaultServices(
          time.hours,
          this.inside
        );
        this.dialog = true;
      }
    },
    defaultServices(time, inside) {
      const today = new Date(this.day);
      const month = today.getMonth();
      const weatherData = this.$store.getters.weatherData;
      if (weatherData) {
        const { sunset, sunrise } = weatherData.fullDaily;
        if (month <= 2 || month >= 10) {
          if (inside) return ["lighting", "heating"];
          else return time <= sunrise || time >= sunset ? ["lighting"] : [];
        } else {
          if (inside || (time <= sunrise || time >= sunset)) return ["lighting"];
        }
      } else {
        // If weather data is not ready use default services
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
        :hours="newBooking.time.hours"
        :minutes="newBooking.time.minutes"
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
  <AdminDialog
    :display="adminDialog"
    :time="deleteTime"
    @delete="(time) => this.$emit('deleteBooking', { day, field: name, time })"
    @close="adminDialog = false"></AdminDialog>
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
