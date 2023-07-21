<template>
  <v-card-text class="text-start">
    <span class="text-caption text-subtitle-2">
    Dichiaro di aver letto e di accettare le <a
        class="text-blue text-decoration-underline"
        href="#"
        rel="noopener noreferrer"
    >condizioni di utilizzo del servizio</a> e l' <a
        class="text-blue text-decoration-underline"
        href="#"
        rel="noopener noreferrer"
    >informativa sul trattamento dei dati personali</a>.</span>
    <v-checkbox
        class="ml-n3"
        v-bind="value"
        :error-messages="error"
        type="checkbox"
        label="Accetta"
        @input="accept = !accept; $emit('update:accept', accept)"
    ></v-checkbox>
  </v-card-text>
</template>

<script>
  export default {
    props: ['accept', 'error'],
    emits: ['update:accept'],
    data: () => ({
      value: false
    })
  }
</script>