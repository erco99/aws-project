<script>
export default {
  emits: ["servicesUpdate", "myTreatUpdate"],
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
      services: this.defaultServicies,
      myTreat: false,
    };
  },
  computed: {
    price() {
      let cost = 11;
      this.services.forEach((element) => (cost = cost + 3));
      cost = cost * this.duration;
      return this.myTreat ? cost : cost / this.players;
    },
  },
  methods: {
    notifyServices(values) {
      this.$emit("servicesUpdate", { value: values, price: this.price });
    },
    notifyMyTreat(value) {
      this.$emit("myTreatUpdate", { value, price: this.price });
    },
  },
  watch: {
    services: function(values) {
      this.notifyServices(values)
    },
    myTreat: function(value) {
      this.notifyMyTreat(value);
    }
  }
};
</script>

<template>
  <v-container fluid>
    <v-card-text class="text-center">Quali servizi vuoi attivare?</v-card-text>
    <v-row class="justify-center">
      <v-col style="min-width: 190px" class="flex-grow-0">
        <v-switch
          :disabled="inside"
          v-model="services"
          value="lighting"
          hide-details
          label="Illuminazione"></v-switch>
        <v-switch
          :disabled="!inside"
          v-model="services"
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
    <v-card-text
      class="text-center pt-0"
      :style="price > this.$store.getters.userBalance ? 'color:' + 'red' : ''"
      >{{ this.$store.getters.userBalance }}</v-card-text
    >
  </v-container>
</template>
