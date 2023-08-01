<template>
  <v-row >
    <v-col sm="12" md="4" class="align-self-baseline">
        <user />
        <timeline  style="margin-top: 15px;"/>
    </v-col>

    <v-col sm="12" md="8">
      <activity/>
    </v-col>

  </v-row>
  <v-row>
    <v-col md="4" class="align-self-baseline">
   
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