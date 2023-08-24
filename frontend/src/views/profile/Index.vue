<template>
  <v-row >
    <v-col cols="12" md="4" class="align-self-baseline">
        <user />
    </v-col>

    <v-col cols="12" md="8" class="align-self-baseline">
      <activity/>
    </v-col>

  </v-row>
</template>

<script>
import User from "./components/User.vue"
import Activity from "./components/Activity.vue"
import Timeline from "./components/Timeline.vue"

export default {
  name: "Profile",
  components: {
    User,
    Activity,
    Timeline
  }
  
}
</script>