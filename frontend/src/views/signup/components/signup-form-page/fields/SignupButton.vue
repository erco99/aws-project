<template>
  <v-col class="text-center" cols="12">
    <v-btn
        type="Login"
        rounded="xl"
        variant="tonal"
        size="large"
        :loading="loading"
        append-icon="mdi-chevron-right">
      Sign Up
    </v-btn>
  </v-col>
</template>

<script>
  export default {
    props: ['loading'],
    data: () => ({
      loading: false
    })
  }
</script>