<script>
import Est from "./body/Est.vue";
import Middle from "./body/Middle.vue";
import West from "./body/West.vue";
export default {
  components: {
    Est,
    Middle,
    West,
  },
  emits: ["durationUpdate", "matchUpdate", "serviciesUpdate"],
  props: {
    defaultDuration: {
      type: Number,
      default: 1,
      validator(value) {
        return value == 1 || value == 2;
      },
    },
    defaultMatch: {
      type: String,
      default: "single",
      validator(value) {
        return ["single", "double"].includes(value);
      },
    },
    defaultServicies: {
      type: Array,
      default: [],
      validator(value) {
        return value.every(
          (element) => element == "lighting" || element == "heating"
        );
      },
    },
    next: Boolean,
    inside: Boolean,
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
      <Est
        :next="next"
        :defaultMatch="defaultMatch"
        :defaultDuration="defaultDuration"
        @duration-update="notifyDuration"
        @match-update="notifyMatch"></Est>
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
