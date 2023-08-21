<template>
  <v-icon :icon="this.$store.getters.unreadNotifications ? 'mdi-bell-ring' : 'mdi-bell'"
          @click="this.$router.push({path: '/notifications'})"></v-icon>
</template>

<script>
export default {
  name: "Appbarnots"
}
</script>