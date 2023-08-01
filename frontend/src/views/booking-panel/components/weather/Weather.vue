<template>
  <v-card class="mx-auto" elevation="4">
    <v-card-title class="text-center">Meteo</v-card-title>
    <div class="loading-circular" v-if="(dataReady === false || this.positionAcquired.acquired === false) && !error">
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
    <v-card-text class="d-flex justify-center" v-if="dataReady && this.positionAcquired.acquired && !error">
      <v-slide-group show-arrows>
        <v-slide-group-item
            v-for="hour in range(hours.start, hours.end, hours.step)" :key="hour">
          <HourCard
              :hour="numberToHour(hour)"
              :wmo="this.weatherData.dayHourly.wmo[hour]"
              :temp="Math.round(this.weatherData.dayHourly.temp[hour])"
              :dayInfo="{sunrise: this.weatherData.dayDaily.sunrise, sunset: this.weatherData.dayDaily.sunset}"></HourCard>
        </v-slide-group-item>
      </v-slide-group>
    </v-card-text>
  </v-card>
</template>

<script>
  import HourCard from "@/views/booking-panel/components/weather/HourCard.vue";
  import { range, numberToHour, getDayHourlyWeather, getDayDailyWeather, getTodayDate } from "@/views/booking-panel/components/weather/utils";
  import { getHourlyWeather, getDailyWeather } from "@/api/weather";
  export default {
    components: { HourCard },
    props: ['day', 'latitude', 'longitude', 'positionAcquired'],
    setup() { return { range, numberToHour }},
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
        getHourlyWeather({latitude, longitude, from}).then((res) => {
          this.weatherData.fullHourly = res.data.weather_data;
          this.weatherData.dayHourly = getDayHourlyWeather(this.weatherData.fullHourly, from);
        }).then(() => {
          getDailyWeather({latitude, longitude, from}).then((res) => {
            this.weatherData.fullDaily = res.data.weather_data;
            this.weatherData.dayDaily = getDayDailyWeather(this.weatherData.fullDaily, from);
            this.dataReady = true;
          })
        })
      }
    },
    watch: {
      day(dayToDisplay) {
        if (dayToDisplay && this.weatherData.fullHourly && this.weatherData.fullDaily) {
          this.weatherData.dayHourly = getDayHourlyWeather(this.weatherData.fullHourly, dayToDisplay.toISOString());
          this.weatherData.dayDaily = getDayDailyWeather(this.weatherData.fullDaily, dayToDisplay.toISOString());
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