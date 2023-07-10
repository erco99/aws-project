<script setup>
import East from "./body/Est.vue";
import Middle from "./body/Middle.vue";
import West from "./body/West.vue";
</script>

<script>
export default {
  emits: ["durationUpdate", "matchUpdate"],
  props: {
    next: Boolean,
  },
  methods: {
    notifyDuration(value) {
      this.$emit("durationUpdate", value);
    },
    notifyMatch(value) {
      this.$emit("matchUpdate", value);
    },
  },
};
</script>

<template>
  <v-row>
    <v-col cols="12" sm="4">
      <East
        :next="next"
        @duration-update="notifyDuration"
        @match-update="notifyMatch"></East>
    </v-col>
    <v-col cols="12" sm="4">
      <Middle></Middle>
    </v-col>
    <v-col cols="12" sm="4">
      <West></West>
    </v-col>
  </v-row>
</template>
