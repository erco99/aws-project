<script>
export default {
  emits: ["playersUpdate"],
  props: {
    playersNumber: {
      type: Number,
      required: true,
      validator(value) {
        return Number.isInteger(value) && value >= 0;
      },
    },
  },
  data() {
    return {
      players: [],
      users: ["Giacomo Romagnoli", "Francesco Ercolani"],
    };
  },
  computed: {
    message() {
      if (this.players.length < this.playersNumber) {
        if (this.playersNumber == 1) {
          return "Aggiungi 1 giocatore";
        }
        return "Aggiungi ".concat(
          this.playersNumber - this.players.length,
          " giocatori"
        );
      }
      if (this.players.length > this.playersNumber) {
        if (this.players.length - this.playersNumber == 1) {
          return "Togli 1 giocatore";
        }
        return "Togli ".concat(
          this.players.length - this.playersNumber,
          " giocatori"
        );
      }
      return "Buon divertimento!";
    },
  },
  methods: {
    notifyPlayers(value) {
      this.$emit("playersUpdate", value);
    },
  },
};
</script>

<template>
  <v-container fluid>
    <v-card-text class="text-center">Con chi giochi?</v-card-text>
    <v-row class="justify-center">
      <v-col cols="10">
        <v-combobox
          :messages="message"
          label="Invita i partecipanti"
          density="compact"
          multiple
          chips
          @update:modelValue="notifyPlayers"
          v-model="players"
          :items="users"
          variant="outlined"></v-combobox>
      </v-col>
    </v-row>
  </v-container>
</template>
