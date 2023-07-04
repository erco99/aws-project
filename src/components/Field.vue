<template>
  <h4>{{ name }}</h4>
  <div class="d-flex">
    <div
      role="button"
      class="border border-dark p-2 bg-success"
      v-for="n in closing - opening + 1"
      @click="book({ hours: opening + n - 1, minutes: minutes })">
      {{ stringfy(opening + n - 1, minutes) }}
    </div>
  </div>
  <v-dialog v-model="dialog" scrollable width="auto"
    ><v-card>
      <v-card-title> Nuova prenotazione </v-card-title>
      <v-card-actions>
        <v-btn color="primary" @click="dialog = false">Annulla</v-btn>
        <v-btn color="primary">Prenota ora</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

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
    stringfy(hours, minutes) {
      if (hours < 10) {
        if (minutes < 10) {
          return "0".concat(String(hours), ":", String(minutes), "0");
        }
        return "0".concat(String(hours), ":", String(minutes));
      }
      if (minutes < 10) {
        return String(hours).concat(":", String(minutes), "0");
      }
      return String(hours).concat(":", String(minutes));
    },
    book(hour) {
      this.newBooking.hour = hour;
      this.dialog = true;
    },
  },
};
</script>
