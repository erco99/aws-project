<script>
import { stringfy, getStringDay, getStringMonth, getDate } from "../commons";
import {
  getTemp,
  getWeatherCodeString,
} from "@/views/booking-panel/components/weather/utils";
export default {
  setup() {
    return {
      stringfy,
      getTemp,
      getWeatherCodeString,
      getStringDay,
      getStringMonth,
      getDate,
    };
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
};
</script>

<template>
  <v-row>
    <v-col cols="12" sm="4">
      <v-card-title class="text-center text-sm-left">
        <p class="font-weight-bold">
          {{ name }}
        </p>
      </v-card-title>
      <v-card-subtitle class="text-center text-sm-left">
        dalle
        {{ stringfy(hours, minutes) }}
        alle
        {{ stringfy(hours + 1, minutes) }}
      </v-card-subtitle>
    </v-col>
    <v-col cols="12" sm="4">
      <v-card-title class="text-center">
        <p class="font-weight-bold">
          {{ getStringDay(day) }} 
        </p> 
      </v-card-title>
    </v-col>
    <v-col cols="12" sm="4">
      <v-card-title class="text-center text-sm-right">
        <p class="font-weight-bold">
          {{ getTemp(day, hours) }}
        </p>
      </v-card-title>
      <v-card-subtitle class="text-center text-sm-right">
        {{ getWeatherCodeString(day, hours) }}
      </v-card-subtitle>
    </v-col>
  </v-row>
</template>
