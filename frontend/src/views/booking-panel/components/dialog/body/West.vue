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
      for (const user of res.data) {
        if (user.email !== this.$store.getters.userEmail) {
          this.users.push({
            title: user.name.concat(" ", user.surname),
            props: {subtitle: user.email},
            value: user,
          });
        }
      }
      this.usersCopy = [...this.users];
    });
  },
  computed: {
    rules() {
      return [this.playersNumber == this.players.length || this.errorMessage];
    },
    errorMessage() {
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
      return true;
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
    <v-card-text class="text-center">
      <p class="font-weight-bold">
        Con chi giochi?
      </p>
    </v-card-text>
    <v-row class="justify-center">
      <v-col cols="10">
        <v-select
          :rules="rules"
          :return-object="false"
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
              <v-text-field
                focused
                density="compact"
                variant="solo-inverted"
                placeholder="Cerca"
                single-line
                hide-details
                v-model="searchTerm"
                @input="searchUser"></v-text-field>
              <v-divider class="mt-2"></v-divider>
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
