<template>
  <v-card class="mx-auto" elevation="4">
    <v-card-title class="text-center">Meteo</v-card-title>
    <div class="loading-circular" v-if="dataReady === false">
      <v-progress-circular
          :size="50"
          color="amber"
          height="4"
          indeterminate>
      </v-progress-circular>
    </div>
    <v-card-text class="d-flex justify-center" v-if="dataReady">
      <v-slide-group show-arrows>
        <v-slide-group-item
            v-for="hour in range(hours.start, hours.end, hours.step)" :key="hour">
          <HourCard :hour="numberToHour(hour)" :wmo="0" :temp="27"></HourCard>
        </v-slide-group-item>
      </v-slide-group>
    </v-card-text>
  </v-card>
</template>

<script>
  import HourCard from "@/views/booking-panel/components/weather/HourCard.vue";
  import { range, numberToHour } from "@/views/booking-panel/components/weather/utils";
  import { getHourlyWeather } from "@/api/weather";
  export default {
    components: { HourCard },
    setup() { return { range, numberToHour }},
    data: () => ({
      hours: {
        start: 8,
        end: 22,
        step: 1
      },
      dataReady: false
    }),
    mounted() {
      getHourlyWeather({latitude: 52.52, longitude: 13.41, from: "2023-07-28"}).then((res) => {
        console.log(res.data);
      })
      setTimeout(function(){this.handleData()}, 2000)
      //this.dataReady = true
    },
    methods: {
      handleData() {
        this.dataReady = true
        console.log(this.dataReady)
      }
    }
  }
</script>

<style>
  .loading-circular {
    display: flex;
    justify-content: center;
    vertical-align: center;
    align-items: center;
    padding-bottom: 20px;
  }
</style>