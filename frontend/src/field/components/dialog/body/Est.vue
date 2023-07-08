<template>
  <v-container fluid>
    <v-card-text class="text-center">Durata</v-card-text>
    <v-row class="justify-center">
      <v-col style="min-width: 120px" class="flex-grow-0">
        <v-radio-group hide-details>
          <v-radio label="1 Ora" value="1"></v-radio>
          <v-radio label="2 Ore" value="2"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-card-text class="text-center">Cosa vuoi prenotare?</v-card-text>
    <v-row class="justify-center">
      <v-col style="min-width: 130px" class="flex-grow-0">
        <v-radio-group hide-details>
          <v-radio label="Singolo" value="single"></v-radio>
          <v-radio label="Doppio" value="double"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </v-container>
</template>
