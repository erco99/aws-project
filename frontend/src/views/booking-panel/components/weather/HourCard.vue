<template>
  <v-card
      class="ma-1"
      width="100"
      elevation="4"
      style="text-align: center; border-radius: 30px"
  >
    <v-card-item class="ma-0 pr-0 pl-0">
      <v-card-text class="ma-0 pa-0">
        <div class="temp-string pb-0">{{ tempToString(temp) }}</div>
        <v-icon class="mx-auto mb-1 mt-1 text-blue-grey-darken-2" :icon="wmoToIcon(wmo, hour, dayInfo)" size="40px"></v-icon>
        <div class="hour-string">{{ hour }}</div>
      </v-card-text>
    </v-card-item>
  </v-card>
</template>

<script>
import {wmoToIcon, tempToString} from "@/views/booking-panel/components/weather/utils";
  export default {
    props: ['hour', 'wmo', 'temp', 'dayInfo'],
    setup() {
      return { wmoToIcon, tempToString }
    }
  }
</script>

<style>
  .temp-string {
    font-size: 20px;
    width: 100%;
    font-weight: bold;
    padding-bottom: 10px
  }

  .hour-string {
    color: gray;
  }
</style>