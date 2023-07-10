<script setup>
import { defaultDuration, defaultMatch } from "../../../commons";
</script>

<script>
export default {
  emits: ["durationUpdate", "matchUpdate"],
  props: {
    next: Boolean,
  },
  data() {
    return {
      duration: defaultDuration,
      match: defaultMatch,
    };
  },
  methods: {
    notifyDuration(value) {
      this.$emit("durationUpdate", Number(value));
    },
    notifyMatch(value) {
      if (value == "single") {
        this.duration = "1";
        this.$emit("durationUpdate", 1);
      }
      this.$emit("matchUpdate", value);
    },
  },
};
</script>

<template>
  <v-container fluid>
    <v-card-text class="text-center">Durata</v-card-text>
    <v-row class="justify-center">
      <v-col style="min-width: 120px" class="flex-grow-0">
        <v-radio-group
          @update:modelValue="notifyDuration"
          v-model="duration"
          hide-details>
          <v-radio label="1 Ora" value="1"></v-radio>
          <v-radio
            v-if="match == 'double' && next"
            label="2 Ore"
            value="2"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-card-text class="text-center">Cosa vuoi prenotare?</v-card-text>
    <v-row class="justify-center">
      <v-col style="min-width: 130px" class="flex-grow-0">
        <v-radio-group
          @update:modelValue="notifyMatch"
          v-model="match"
          hide-details>
          <v-radio label="Singolo" value="single"></v-radio>
          <v-radio label="Doppio" value="double"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </v-container>
</template>
