<template>
  <h4>{{ name }}</h4>
  <div class="d-flex">
    <div
      role="button"
      class="border border-dark p-2 bg-success"
      v-for="hour in hours"
      @click="book(hour)">
      {{ hour }}
    </div>
  </div>
  <v-dialog v-model="dialog" scrollable width="auto"
    ><v-card>
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="dialog = false">Prenota ora</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    name: String,
    hours: [String],
  },
  data() {
    return {
      bookingHour: "",
      dialog: false,
    };
  },
  methods: {
    book(hour) {
      this.bookingHour = hour;
      this.dialog = true;
    },
  },
};
</script>
