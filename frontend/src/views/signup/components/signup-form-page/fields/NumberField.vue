<template>
  <v-text-field
      :value="number"
      @input="$emit('update:number', $event.target.value)"
      :error-messages="error"
      density="compact"
      placeholder="Numero di telefono"
      prepend-inner-icon="mdi-cellphone"
      variant="solo"
      rounded="xl"
  ></v-text-field>
</template>

<script>
 export default {
   props: ['number', 'error'],
   emits: ['update:number']
 }
</script>