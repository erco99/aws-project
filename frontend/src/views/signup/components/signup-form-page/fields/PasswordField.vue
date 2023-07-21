<template>
  <v-text-field
      :value="password"
      @input="$emit('update:password', $event.target.value)"
      :error-messages="error"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      :placeholder="placeholder"
      prepend-inner-icon="mdi-lock-outline"
      @click:append-inner="visible = !visible"
      variant="solo"
      rounded="xl"
  ></v-text-field>
</template>

<script>
  export default {
    props: ['password', 'error', 'placeholder'],
    emit: ['update:password'],
    data: () => ({
      visible: false,
    }),
  }
</script>