<script setup>
import { stringfy } from "../../commons";
</script>

<script>
export default {
  props: {
    name: String,
    hours: Number,
    minutes: Number,
  },
};
</script>

<template>
  <v-row>
    <v-col cols="12" sm="4">
      <v-card-title class="text-center text-sm-left">
        {{ name }}
      </v-card-title>
      <v-card-subtitle class="text-center text-sm-left">
        dalle
        {{ stringfy(hours, minutes) }}
        alle
        {{ stringfy(hours + 1, minutes) }}
      </v-card-subtitle>
    </v-col>
    <v-col cols="12" sm="4">
      <v-card-title class="text-center"> 14 Giugno </v-card-title>
      <v-card-subtitle class="text-center"> Mercoledì </v-card-subtitle>
    </v-col>
    <v-col cols="12" sm="4">
      <v-card-title class="text-center text-sm-right"> 23&deg;C </v-card-title>
      <v-card-subtitle class="text-center text-sm-right">
        Soleggiato
      </v-card-subtitle>
    </v-col>
  </v-row>
</template>
