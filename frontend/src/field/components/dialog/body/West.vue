<template>
  <v-container fluid>
    <v-card-text class="text-center">Con chi giochi?</v-card-text>
    <v-row class="justify-center">
      <v-col cols="10">
        <v-combobox
          label="Invita i partecipanti"
          :items="['Giacomo Romagnoli']"
          variant="outlined"></v-combobox>
      </v-col>
    </v-row>
  </v-container>
</template>
