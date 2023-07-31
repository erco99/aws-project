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
          <HourCard
              :hour="numberToHour(hour)"
              :wmo="this.dayHourlyWeatherData.wmo[hour]"
              :temp="Math.round(this.dayHourlyWeatherData.temp[hour])"
              :dayInfo="{sunrise: this.dayDailyWeatherData.sunrise, sunset: this.dayDailyWeatherData.sunset}"></HourCard>
        </v-slide-group-item>
      </v-slide-group>
    </v-card-text>
  </v-card>
</template>

<script>
  import HourCard from "@/views/booking-panel/components/weather/HourCard.vue";
  import { range, numberToHour, getDayHourlyWeather, getDayDailyWeather } from "@/views/booking-panel/components/weather/utils";
  import { getHourlyWeather, getDailyWeather } from "@/api/weather";
  export default {
    components: { HourCard },
    props: ['day'],
    setup() { return { range, numberToHour }},
    data: () => ({
      hours: {
        start: 8,
        end: 22,
        step: 1
      },
      dataReady: false,
      fullHourlyWeatherData: null,
      fullDailyWeatherData: null,
      dayHourlyWeatherData: null,
      dayDailyWeatherData: null,
    }),
    mounted() {
      this.fetchWeatherData(44.4452269, 11.8267438, "2023-07-29");
    },
    methods: {
      fetchWeatherData(latitude, longitude, from) {
        getHourlyWeather({latitude, longitude, from}).then((res) => {
          this.fullHourlyWeatherData = res.data.weather_data;
          this.dayHourlyWeatherData = getDayHourlyWeather(this.fullHourlyWeatherData, from);
        }).then(() => {
          getDailyWeather({latitude, longitude, from}).then((res) => {
            this.fullDailyWeatherData = res.data.weather_data;
            this.dayDailyWeatherData = getDayDailyWeather(this.fullDailyWeatherData, from);
            this.dataReady = true;
          })
        })
      }
    },
    watch: {
      day(dayToDisplay) {
        if (dayToDisplay && this.fullHourlyWeatherData) {
          this.dayHourlyWeatherData = getDayHourlyWeather(this.fullHourlyWeatherData, dayToDisplay.toISOString());
          this.dayDailyWeatherData = getDayDailyWeather(this.fullDailyWeatherData, dayToDisplay.toISOString());
        }
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