<script>
import { stringfy, dayToString, monthToString } from "../commons";
export default {
  setup() {
    return { stringfy };
  },
  props: {
    name: String,
    hours: Number,
    minutes: Number,
    day: {
      type: String,
      required: true,
      validator: (value) => Date.parse(value),
    },
  },
  computed: {
    date() {
      return new Date(this.day);
    },
    monthDay() {
      return this.date.getDate() + " " + monthToString[this.date.getMonth()];
    },
    weekDay() {
      return dayToString[this.date.getDay()];
    },
  },
};
</script>

<template>
  <v-row>
    <v-col cols="12" sm="4">
      <v-card-title class="text-center text-sm-left">
        {{ name }}
      </v-card-title>
      <v-card-subtitle class="text-center text-sm-left">
        dalle
        {{ stringfy(hours, minutes) }}
        alle
        {{ stringfy(hours + 1, minutes) }}
      </v-card-subtitle>
    </v-col>
    <v-col cols="12" sm="4">
      <v-card-title class="text-center"> {{ monthDay }} </v-card-title>
      <v-card-subtitle class="text-center"> {{ weekDay }} </v-card-subtitle>
    </v-col>
    <v-col cols="12" sm="4">
      <v-card-title class="text-center text-sm-right"> 23&deg;C </v-card-title>
      <v-card-subtitle class="text-center text-sm-right">
        Soleggiato
      </v-card-subtitle>
    </v-col>
  </v-row>
</template>
