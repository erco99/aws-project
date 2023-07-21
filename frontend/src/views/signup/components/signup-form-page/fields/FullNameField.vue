<template>
  <v-text-field
    class="pt-4"
    :value="full_name"
    @input="$emit('update:full_name', $event.target.value)"
    :error-messages="error"
    density="compact"
    placeholder="Nome e Cognome"
    prepend-inner-icon="mdi-account-outline"
    variant="solo"
    rounded="xl"
    >
  </v-text-field>
</template>

<script>
  export default {
    props: ['full_name', 'error'],
    emits: ['update:full_name']
  }
</script>