<template>
  <v-card
      class="ma-1"
      width="100"
      :title="hour"
      elevation="4"
      style="text-align: center">
    <v-card-text>
      <v-icon
          class="mx-auto d-flex mb-2"
          size="x-large"
          :icon="wmoToIcon(wmo)">
      </v-icon>
      {{ tempToString(temp) }}
    </v-card-text>
  </v-card>
</template>

<script>
  import { wmoToIcon, tempToString } from "@/views/booking-panel/components/weather/utils";
  export default {
    props: ['hour', 'wmo', 'temp'],
    setup() {
      return { wmoToIcon, tempToString }
    }
  }
</script>