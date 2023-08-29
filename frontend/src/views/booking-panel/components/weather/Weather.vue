<template>
  <v-card class="mx-auto rounded-0" elevation="4">
    <v-card-title class="text-center">{{ getWeatherHeaderString }}</v-card-title>
    <v-divider class="mx-auto" :thickness="2" style="width: 95%"></v-divider>
    <div class="loading-circular" v-if="(!this.dataReady || this.positionAcquired.acquired === false) && !error">
      <v-progress-circular
          :size="50"
          color="amber"
          height="4"
          indeterminate>
      </v-progress-circular>
    </div>
    <div class="text-center pb-5" v-if="error">
      <v-icon icon="mdi-alert-circle-outline" size="25px" color="red"></v-icon>
      {{ error }}
    </div>
    <v-card-text class="d-flex justify-center" v-if="this.dataReady && this.positionAcquired.acquired && !error">
      <v-slide-group show-arrows>
        <v-slide-group-item
            v-for="hour in range(hours.start, hours.end, hours.step)" :key="hour">
          <HourCard
              :hour="numberToHour(hour)"
              :wmo="this.weatherData.dayHourly.wmo[hour]"
              :temp="this.weatherData.dayHourly.temp[hour]"
              :dayInfo="{sunrise: this.weatherData.dayDaily.sunrise, sunset: this.weatherData.dayDaily.sunset}"></HourCard>
        </v-slide-group-item>
      </v-slide-group>
    </v-card-text>
  </v-card>
</template>

<script>
  import HourCard from "@/views/booking-panel/components/weather/HourCard.vue";
  import {
    range,
    numberToHour,
    getDayHourlyWeather,
    getDayDailyWeather,
    getTodayDate,
    getTemp,
    getWeatherCodeString,
    tempToString
  } from "@/views/booking-panel/components/weather/utils";
  export default {
    components: { HourCard },
    props: ['day', 'latitude', 'longitude', 'positionAcquired'],
    setup() { return { range, numberToHour, getWeatherCodeString }},
    data: () => ({
      hours: {
        start: 8,
        end: 22,
        step: 1
      },
      dataReady: false,
      weatherData: {
        fullHourly: null,
        fullDaily: null,
        dayHourly: null,
        dayDaily: null,
      },
      error: null
    }),
    methods: {
      fetchWeatherData(latitude, longitude, from) {
        this.$store.dispatch('weather/fetchWeather', { latitude, longitude, from }).then(() => {
          this.weatherData.fullHourly = this.$store.getters.hourlyWeather;
          this.weatherData.dayHourly = getDayHourlyWeather(from);
          this.weatherData.fullDaily = this.$store.getters.dailyWeather;
          this.weatherData.dayDaily = getDayDailyWeather(from);
          this.dataReady = true;
        }).catch(err => {
          console.log(err)
          this.error = "Impossibile mostrare il meteo"
        })
      },
    },
    watch: {
      day(dayToDisplay) {
        if (dayToDisplay && this.weatherData.fullHourly && this.weatherData.fullDaily) {
          this.weatherData.dayHourly = getDayHourlyWeather(dayToDisplay);
          this.weatherData.dayDaily = getDayDailyWeather(dayToDisplay);
        }
      },
      positionAcquired(newObj) {
        if (newObj.acquired) {
          this.fetchWeatherData(this.latitude, this.longitude, getTodayDate());
        } else {
          if (newObj.code === 1) {
            // User has not accepted the geolocation
            this.error = "Impossibile mostrare il meteo, fornire il permesso alla geolocalizzaione"
          } else {
            // Another error
            this.error = "Impossibile mostrare il meteo"
          }
        }
      }
    },
    computed: {
      getWeatherHeaderString() {
        return !this.dataReady ? "Meteo" : "Meteo - ".concat(
            getTemp(this.day), " ",
            getWeatherCodeString(this.day), " ",
            tempToString(this.weatherData.dayDaily.temp_max), "/", tempToString(this.weatherData.dayDaily.temp_min))
      },
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