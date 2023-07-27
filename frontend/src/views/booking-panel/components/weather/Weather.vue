<template>
  <v-card class="mx-auto" elevation="4">
    <v-card-title class="text-center">Meteo</v-card-title>
      <v-card-text class="d-flex justify-center">
        <v-slide-group
            show-arrows>
          <v-slide-group-item
              v-for="hour in range(hours.start, hours.end, hours.step)"
              :key="hour">
            <HourCard :hour="numberToHour(hour)" :wmo="67" :temp="27"></HourCard>
          </v-slide-group-item>
        </v-slide-group>
      </v-card-text>
  </v-card>
</template>

<script>
  import HourCard from "@/views/booking-panel/components/weather/HourCard.vue";
  import { range, numberToHour } from "@/views/booking-panel/components/weather/utils";
  export default {
    components: { HourCard },
    setup() { return { range, numberToHour }},
    data: () => ({
      hours: {
        start: 8,
        end: 22,
        step: 1
      }
    }),
  }
</script>