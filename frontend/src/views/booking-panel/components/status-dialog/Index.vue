<template>
  <v-dialog :model-value="display" scrollable persistent width="500">
    <v-card>
      <v-card-title> Modifica lo stato del campo </v-card-title>
      <v-card-text>
        Seleziona uno o piu' stati per il campo
        <v-combobox
            v-model="select"
            :items="items"
            label="Seleziona gli stati"
            multiple
            chips
        ></v-combobox>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="this.$emit('close')">Annulla</v-btn>
        <v-btn
            color="primary"
            @click="this.$emit('saveStates', this.select);this.$emit('close');"
        >Salva</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  emits: ['close', 'saveStates'],
  props: {
    display: Boolean,
    currentStates: Array,
  },
  data() {
    return {
      select: this.currentStates,
      items: ["Coperto", "Buche", "Rete rotta", "Rete lenta"]
    }
  }
}
</script>