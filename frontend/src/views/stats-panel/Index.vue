<template>
  <div>
    <v-row>
      <v-col cols="12" lg="8">
        <BookingsGraph></BookingsGraph>
      </v-col>

      <v-col cols="12" lg="4">
        <BookingPie></BookingPie>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="4">
        <UsersCount></UsersCount>
      </v-col>
      <v-col cols="12" lg="8">
        <EarningsGraph></EarningsGraph>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BookingsGraph from "@/views/stats-panel/components/bookings-graph.vue";
import BookingPie from "@/views/stats-panel/components/booking-pie.vue";
import UsersCount from "@/views/stats-panel/components/users-count.vue";
import EarningsGraph from "@/views/stats-panel/components/earnings-graph.vue";
export default {
    components: { BookingsGraph, BookingPie, UsersCount, EarningsGraph }
}
</script>