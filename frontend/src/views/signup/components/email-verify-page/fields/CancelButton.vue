<template>
  <v-col class="text-center pt-15" cols="12">
    <v-btn
        rounded="xl"
        variant="tonal"
        size="default"
        prepend-icon="mdi-chevron-left"
        @click="this.$emit('onCancelStarted')">
      Indietro
    </v-btn>
  </v-col>
</template>

<script>
export default {
  emits: ['onCancelStarted']
}
</script>