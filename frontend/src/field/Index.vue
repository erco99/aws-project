<script setup>
import Header from "./components/dialog/Header.vue";
import Body from "./components/dialog/Body.vue";
import { stringfy } from "./commons";
</script>

<script>
export default {
  props: {
    name: String,
    opening: Number,
    closing: Number,
    minutes: Number,
  },
  data() {
    return {
      newBooking: {
        hour: {},
      },
      dialog: false,
    };
  },
  methods: {
    book(hour) {
      this.newBooking.hour = hour;
      this.dialog = true;
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
  <v-dialog v-model="dialog" scrollable width="1024"
    ><v-card>
      <Header
        :hours="newBooking.hour.hours"
        :minutes="newBooking.hour.minutes"
        :name="name"></Header>
      <Body></Body>
      <v-card-actions class="justify-center">
        <v-btn color="primary" @click="dialog = false">Annulla</v-btn>
        <v-btn color="primary">Prenota ora</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
