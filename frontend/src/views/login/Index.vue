<script setup>
  import LoginCard from "@/views/login/components/LoginCard.vue";
  import Body from "@/views/booking-panel/components/dialog/Body.vue";
  import BgImage from "@/components/bg-image/Index.vue";
</script>

<template>
  <BgImage></BgImage>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col>
        <LoginCard>
        </LoginCard>
      </v-col>
    </v-row>
  </v-container>
</template>
