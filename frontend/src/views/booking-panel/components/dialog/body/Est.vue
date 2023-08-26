<script>
export default {
  emits: ["durationUpdate", "matchUpdate"],
  props: {
    next: Boolean,
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
  },
  data() {
    return {
      duration: this.defaultDuration,
      match: this.defaultMatch,
    };
  },
  methods: {
    notifyDuration(value) {
      this.$emit("durationUpdate", value);
    },
    notifyMatch(value) {
      if (value == "single") {
        this.duration = 1;
        this.$emit("durationUpdate", this.duration);
      }
      this.$emit("matchUpdate", value);
    },
  },
};
</script>

<template>
  <v-container fluid>
    <v-card-text class="text-center">
      <p class="font-weight-bold">
        Durata
      </p>
    </v-card-text>
    <v-row class="justify-center">
      <v-col style="min-width: 120px" class="flex-grow-0">
        <v-radio-group
          @update:modelValue="notifyDuration"
          v-model="duration"
          hide-details>
          <v-radio label="1 Ora" :value="1"></v-radio>
          <v-radio
            :disabled="!(next && match == 'double')"
            label="2 Ore"
            :value="2"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-card-text class="text-center">
      <p class="font-weight-bold">
        Cosa vuoi prenotare?
      </p>
    </v-card-text>
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
