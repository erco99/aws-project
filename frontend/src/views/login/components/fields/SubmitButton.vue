<template>
  <v-col class="text-center pt-16" cols="12">
    <v-btn type="submit" rounded="xl" variant="tonal" size="large" :loading="loading">
      Login
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