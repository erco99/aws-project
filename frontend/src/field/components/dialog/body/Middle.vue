<template>
  <v-container fluid>
    <v-card-text class="text-center">Quali servizi vuoi attivare?</v-card-text>
    <v-row class="justify-center">
      <v-col style="min-width: 180px" class="flex-grow-0">
        <v-switch hide-details label="Illuminazione"></v-switch>
        <v-switch hide-details label="Riscaldamento"></v-switch>
      </v-col>
    </v-row>
    <v-card-text class="text-center">Totale costo prenotazione</v-card-text>
    <v-card-text class="text-center py-0">5,50</v-card-text>
    <v-row class="justify-center">
      <v-col style="min-width: 180px" class="flex-grow-0">
        <v-checkbox hide-details label="Offri la partita"></v-checkbox>
      </v-col>
    </v-row>
    <v-card-text class="text-center pt-0">Saldo disponibile</v-card-text>
    <v-card-text class="text-center pt-0">9,25</v-card-text>
  </v-container>
</template>
