<script>
import Header from "./components/dialog/Header.vue";
import Body from "./components/dialog/Body.vue";
import { stringfy } from "./commons";
export default {
  setup() {
    return { stringfy };
  },
  components: { Body, Header },
  props: {
    inside: Boolean,
    name: { type: String, required: true },
    opening: { type: Number, required: true },
    closing: { type: Number, required: true },
    minutes: { type: Number, required: true },
  },
  data() {
    return {
      duration: 0,
      match: "",
      newBooking: {
        hour: {},
        owner: "",
        players: [],
        servicies: [],
      },
      dialog: false,
    };
  },
  methods: {
    reset() {
      this.duration = 0;
      this.match = "";
      this.newBooking.servicies = [];
      this.newBooking.players = [];
      this.newBooking.hour = {};
    },
    book(hour) {
      this.duration = 1;
      this.match = "single";
      this.newBooking.hour = hour;
      this.newBooking.servicies = this.defaultServices(hour.hours, this.inside);
      this.dialog = true;
    },
    defaultServices(time, inside) {
      const today = new Date();
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
  <h4>{{ name }}</h4>
  <div class="d-flex">
    <div
      role="button"
      class="border border-dark p-2 bg-success"
      v-for="n in closing - opening + 1"
      :key="n"
      @click="book({ hours: opening + n - 1, minutes: minutes })">
      {{ stringfy(opening + n - 1, minutes) }}
    </div>
  </div>
  <v-dialog @update:modelValue="reset" v-model="dialog" scrollable width="1024"
    ><v-card>
      <Header
        :hours="newBooking.hour.hours"
        :minutes="newBooking.hour.minutes"
        :name="name"></Header>
      <Body
        next
        :defaultDuration="1"
        defaultMatch="single"
        :inside="inside"
        :defaultServicies="this.newBooking.servicies"
        @duration-update="(value) => (duration = value)"
        @match-update="(value) => (match = value)"
        @servicies-update="(value) => (newBooking.servicies = value)"
        @players-update="(value) => (newBooking.players = value)"></Body>
      <v-card-actions class="justify-center">
        <v-btn
          color="primary"
          @click="
            dialog = false;
            reset();
          "
          >Annulla</v-btn
        >
        <v-btn color="primary" @click="console.log(duration, match, newBooking)"
          >Prenota ora</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
