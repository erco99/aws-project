<template>
  <v-col class="text-center pt-15" cols="12">
    <v-btn
        type="Login"
        rounded="xl"
        variant="tonal"
        size="large"
        :disabled="disabled"
        append-icon="mdi-chevron-right">
      Verifica
    </v-btn>
  </v-col>
</template>

<script>
  export default {
    props: ['disabled']
  }
</script>