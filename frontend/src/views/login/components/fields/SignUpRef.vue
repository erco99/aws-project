<template>
  <v-card-text class="text-center">
                <span class="text-medium-emphasis text-subtitle-2">
                Non sei iscritto?
                <a
                    class="text-blue text-decoration-none"
                    href="#"
                    rel="noopener noreferrer"
                    @click="signup"
                >Iscriviti <v-icon icon="mdi-chevron-right"></v-icon></a></span>
  </v-card-text>
</template>

<script>
  export default {
    methods: {
      signup: function(){
        this.$emit('signup')
      }
    }
  }
</script>