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
  emits: ["durationUpdate", "matchUpdate", "serviciesUpdate", "playersUpdate"],
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
      this.$emit("serviciesUpdate", value);
    },
    notifyPlayers(value) {
      this.$emit("playersUpdate", value);
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
        :duration="duration"
        :players="numberOfPlayers"
        @servicies-update="notifyServices"></Middle>
    </v-col>
    <v-col cols="12" sm="4">
      <West @players-update="notifyPlayers"></West>
    </v-col>
  </v-row>
</template>
