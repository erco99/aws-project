<script>
export default {
  emits: ["playersUpdate"],
  data() {
    return {
      players: [],
      users: ["Giacomo Romagnoli", "Francesco Ercolani"],
    };
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
