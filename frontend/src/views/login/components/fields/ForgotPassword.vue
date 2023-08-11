<template>
  <a
      class="text-caption text-decoration-none text-blue pl-3"
      href="#"
      rel="noopener noreferrer"
      @click="redirect">Password dimenticata?
  </a>
</template>

<script>
  export default {
    methods: {
      redirect() {
        this.$router.push("/forgot-password")
      }
    }
  }
</script>