<script setup>
import East from "./body/Est.vue";
import Middle from "./body/Middle.vue";
import West from "./body/West.vue";
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
