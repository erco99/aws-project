<template>
  <v-row >
    <v-col sm="12" md="4" class="align-self-baseline">
      <BookingsGraph></BookingsGraph>
    </v-col>

    <v-col sm="12" md="8">

    </v-col>

  </v-row>
  <v-row>
    <v-col md="4" class="align-self-baseline">
    </v-col>
  </v-row>
</template>

<script>
import BookingsGraph from "@/views/stats-panel/components/bookings-graph.vue";
export default {
    components: { BookingsGraph }
}
</script>