<template>
  <v-dialog :model-value="display" scrollable persistent width="500">
    <v-card>
      <v-card-title> Cancella la prenotazione </v-card-title>
      <v-card-text>
        Sei sicuro di voler cancellare la prenotazione?
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="this.$emit('close')">Annulla</v-btn>
        <v-btn
          color="primary"
          @click="
            this.$emit('delete', time);
            this.$emit('close');
          "
          >Cancella</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  emits: ["delete", "close"],
  props: {
    display: Boolean,
    time: Object,
  },
};
</script>
