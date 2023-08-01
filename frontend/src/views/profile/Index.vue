<template>
  <v-row>
    <v-col sm="12" md="4">
      <user />
    </v-col>

    <v-col sm="12" md="8">
      <activity />
    </v-col>

  </v-row>
</template>

<script>
import User from "./components/User.vue"
import Activity from "./components/Activity.vue"

export default {
  name: "Profile",
  components: {
    User,
    Activity
  }
  
}
</script>