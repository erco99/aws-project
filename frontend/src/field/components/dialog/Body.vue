<script setup>
import East from "./body/est.vue";
import Middle from "./body/middle.vue";
import West from "./body/west.vue";
</script>
<template>
  <v-row>
    <v-col cols="12" sm="4">
      <East></East>
    </v-col>
    <v-col cols="12" sm="4">
      <Middle></Middle>
    </v-col>
    <v-col cols="12" sm="4">
      <West></West>
    </v-col>
  </v-row>
</template>
