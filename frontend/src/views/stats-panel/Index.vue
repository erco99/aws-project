<template>
  <v-row >
    <v-col sm="12" md="6" class="align-self-baseline">
      <BookingsGraph></BookingsGraph>
    </v-col>

    <v-col sm="12" md="6">
      <BookingPie></BookingPie>
    </v-col>

  </v-row>
  <v-row>
    <v-col md="4" class="align-self-baseline">
    </v-col>
  </v-row>
</template>

<script>
import BookingsGraph from "@/views/stats-panel/components/bookings-graph.vue";
import BookingPie from "@/views/stats-panel/components/booking-pie.vue";
export default {
    components: { BookingsGraph, BookingPie }
}
</script>