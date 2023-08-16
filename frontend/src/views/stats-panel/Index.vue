<template>
  <v-container class="container">
    <v-row>
      <v-col sm="12" md="6">
        <BookingsGraph></BookingsGraph>
      </v-col>

      <v-col sm="12" md="6">
        <BookingPie></BookingPie>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="12">
          <UsersCount></UsersCount>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BookingsGraph from "@/views/stats-panel/components/bookings-graph.vue";
import BookingPie from "@/views/stats-panel/components/booking-pie.vue";
import UsersCount from "@/views/stats-panel/components/users-count.vue";
export default {
    components: { BookingsGraph, BookingPie, UsersCount }
}
</script>