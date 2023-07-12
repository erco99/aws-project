<script>
export default {
  emits: ["serviciesUpdate"],
  props: {
    players: {
      type: Number,
      required: true,
      validator(value) {
        return value != 0;
      },
    },
    duration: {
      type: Number,
      required: true,
      validator(value) {
        return value != 0;
      },
    },
    inside: Boolean,
    defaultServicies: {
      type: Array,
      default: [],
      validator(value) {
        return value.every(
          (element) => element == "lighting" || element == "heating"
        );
      },
    },
  },
  data() {
    return {
      servicies: this.defaultServicies,
      myTreat: false,
    };
  },
  computed: {
    price() {
      let cost = 11;
      this.servicies.forEach((element) => (cost = cost + 3));
      cost = cost * this.duration;
      return this.myTreat ? cost : cost / this.players;
    },
  },
  methods: {
    notifyServices(value) {
      this.$emit("serviciesUpdate", value);
    },
  },
};
</script>

<template>
  <v-container fluid>
    <v-card-text class="text-center">Quali servizi vuoi attivare?</v-card-text>
    <v-row class="justify-center">
      <v-col style="min-width: 180px" class="flex-grow-0">
        <v-switch
          @update:modelValue="notifyServices"
          v-model="servicies"
          value="lighting"
          hide-details
          label="Illuminazione"></v-switch>
        <v-switch
          :disabled="!inside"
          @update:modelValue="notifyServices"
          v-model="servicies"
          value="heating"
          hide-details
          label="Riscaldamento"></v-switch>
      </v-col>
    </v-row>
    <v-card-text class="text-center">Totale costo prenotazione</v-card-text>
    <v-card-text class="text-center py-0">{{ price }}</v-card-text>
    <v-row class="justify-center">
      <v-col style="min-width: 180px" class="flex-grow-0">
        <v-checkbox
          hide-details
          label="Offri la partita"
          v-model="myTreat"></v-checkbox>
      </v-col>
    </v-row>
    <v-card-text class="text-center pt-0">Saldo disponibile</v-card-text>
    <v-card-text class="text-center pt-0">9,25</v-card-text>
  </v-container>
</template>
