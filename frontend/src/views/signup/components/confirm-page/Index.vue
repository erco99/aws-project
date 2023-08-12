<template>
  <div class="text-center text-medium-emphasis text-h8 font-weight-bold pt-2 pb-2">
    Grazie per esserti registrato, il tuo account è pronto per l'utilizzo
  </div>

  <v-img v-if="showGif" src="/tick-gif-inst.gif" height="150px"></v-img>

  <v-col class="text-center pt-2" cols="12">
    <v-btn rounded="xl" variant="tonal" size="large" @click="this.$router.push('/login')">
      Sign In
    </v-btn>
  </v-col>
</template>

<script>
  export default {
    data: () => ({
      showGif: false
    }),
    created() {
      this.showGif = true;
    }
  }
</script>