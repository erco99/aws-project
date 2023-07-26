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
      users: [
        {
          title: "Giacomo Romagnoli",
          value: {
            name: "Giacomo",
            surname: "Romagnoli",
            email: "giek99@live.it",
          },
        },
      ],
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
        <v-select
          :return-object="false"
          :messages="message"
          label="Invita i partecipanti"
          density="compact"
          multiple
          chips
          @update:modelValue="notifyPlayers"
          v-model="players"
          :items="users"
          variant="outlined">
          <!--<template v-slot:item="{ props }">
            <v-list-item @click="props.onClick">
              <v-list-item-title>
                {{ props.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ props.value.email }}
              </v-list-item-subtitle>
              <template v-slot:append>
                <v-checkbox hide-details></v-checkbox>
              </template>
            </v-list-item>
          </template>-->
        </v-select>
      </v-col>
    </v-row>
  </v-container>
</template>
