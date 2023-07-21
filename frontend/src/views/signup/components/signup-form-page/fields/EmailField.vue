<template>
  <v-text-field
      :value="email"
      @input="$emit('update:email', $event.target.value)"
      :error-messages="error"
      density="compact"
      placeholder="Email"
      prepend-inner-icon="mdi-email-outline"
      variant="solo"
      rounded="xl"
  ></v-text-field>
</template>

<script>
  export default {
    props: ['email', 'error'],
    emits: ['update:email']
  }
</script>

