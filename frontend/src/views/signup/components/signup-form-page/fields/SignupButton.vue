<template>
  <v-col class="text-center pt-5" cols="12">
    <v-btn type="Login" rounded="xl" variant="tonal" size="large" :loading="loading">
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