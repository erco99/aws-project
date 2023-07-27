<script>
import { getUsers } from "../../../../../api/user";
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
      searchTerm: "",
      players: [],
      usersCopy: [],
      users: [],
    };
  },
  mounted() {
    getUsers().then((res) => {
      console.log(res);
      for (const user of res.data) {
        this.users.push({
          title: user.name.concat(" ", user.surname),
          props: { subtitle: user.email },
          value: user,
        });
      }
      this.usersCopy = [...this.users];
    });
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
    searchUser(_) {
      if (!this.searchTerm) {
        this.users = this.usersCopy;
      }
      this.users = this.usersCopy.filter((user) => {
        return (
          user.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
        );
      });
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
          <template v-slot:prepend-item>
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                  focused
                  density="compact"
                  variant="solo-inverted"
                  placeholder="Cerca"
                  single-line
                  hide-details
                  v-model="searchTerm"
                  @input="searchUser"></v-text-field>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-slot:item="{ props }">
            <v-list-item v-bind="props"> </v-list-item>
          </template>
        </v-select>
      </v-col>
    </v-row>
  </v-container>
</template>
