<template>
  <v-card
      class="ma-1"
      width="100"
      elevation="4"
      style="text-align: center; border-radius: 30px"
  >
    <v-card-item class="ma-0 pr-0 pl-0">
      <v-card-text>
        <div class="temp-string">{{ tempToString(temp) }}</div>
        <v-img class="mx-auto" :src="wmoToCustomIcon(wmo)" width="40px" height="40px"></v-img>
        <div class="hour-string">{{ hour }}</div>
      </v-card-text>
    </v-card-item>
  </v-card>
</template>

<script>
  import { wmoToIcon, tempToString, wmoToCustomIcon } from "@/views/booking-panel/components/weather/utils";
  export default {
    props: ['hour', 'wmo', 'temp'],
    setup() {
      return { wmoToIcon, tempToString, wmoToCustomIcon }
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