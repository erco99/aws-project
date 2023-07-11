<script setup>
import East from "./body/Est.vue";
import Middle from "./body/Middle.vue";
import West from "./body/West.vue";
</script>

<script>
export default {
  emits: ["durationUpdate", "matchUpdate", "serviciesUpdate"],
  props: {
    next: Boolean,
    inside: Boolean,
    defaultServicies: Array,
  },
  methods: {
    notifyDuration(value) {
      this.$emit("durationUpdate", value);
    },
    notifyMatch(value) {
      this.$emit("matchUpdate", value);
    },
    notifyServices(value) {
      this.$emit("serviciesUpdate", value);
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
      <Middle
        :inside="inside"
        :defaultServicies="defaultServicies"
        @servicies-update="notifyServices"></Middle>
    </v-col>
    <v-col cols="12" sm="4">
      <West></West>
    </v-col>
  </v-row>
</template>
