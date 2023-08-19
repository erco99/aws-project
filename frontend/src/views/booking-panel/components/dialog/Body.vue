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
  emits: [
    "durationUpdate",
    "matchUpdate",
    "servicesUpdate",
    "playersUpdate",
    "myTreatUpdate",
  ],
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
  data() {
    return {
      duration: this.defaultDuration,
      match: this.defaultMatch,
    };
  },
  computed: {
    numberOfPlayers() {
      switch (this.match) {
        case "single":
          return 2;
        case "double":
          return 4;
        default:
          return 1;
      }
    },
  },
  methods: {
    notifyDuration(value) {
      this.duration = value;
      this.$emit("durationUpdate", value);
    },
    notifyMatch(value) {
      this.match = value;
      this.$emit("matchUpdate", value);
    },
    notifyServices(value) {
      this.$emit("servicesUpdate", value);
    },
    notifyPlayers(value) {
      this.$emit("playersUpdate", value);
    },
    notifyMyTreat(value) {
      this.$emit("myTreatUpdate", value);
    },
  },
};
</script>

<template>
  <v-row class="justify-center">
    <v-col cols="12" md="4" sm="5">
      <Est
        :next="next"
        :defaultMatch="defaultMatch"
        :defaultDuration="defaultDuration"
        @duration-update="notifyDuration"
        @match-update="notifyMatch"></Est>
    </v-col>
    <v-col cols="12" md="4" sm="5">
      <Middle
        :inside="inside"
        :defaultServicies="defaultServicies"
        :duration="duration"
        :players="numberOfPlayers"
        @services-update="notifyServices"
        @my-treat-update="notifyMyTreat"></Middle>
    </v-col>
    <v-col cols="12" md="4" sm="8">
      <West
        :players-number="numberOfPlayers - 1"
        @players-update="notifyPlayers"></West>
    </v-col>
  </v-row>
</template>
