<template>
  <v-card class="mx-auto rounded-4" elevation="4">
    <v-card-item class="justify-center">
      <div>
        <div class="text-overline mb-1 justify-center text-center">
          PROFILO UTENTE
        </div>
        <v-container style="display: flex; align-items: center; flex-direction: column">
        <profile-avatar
            v-if="!this.$store.getters.userAvatar || this.$store.getters.userAvatar === ''"
            class="big-profile"
            :username="this.$store.getters.userFullname"
            customSize="150px"
            @click="this.changeProfileImage()"></profile-avatar>
        <v-img v-else :src="this.$store.getters.userAvatar" @click="this.changeProfileImage()" width="150px"></v-img>
        </v-container>
        <div class="text-center pb-1" style="font-weight: bold; font-size: 20px">{{ this.$store.getters.userFullname }}</div>
        <div class="text-caption text-center" style="font-style: italic">{{ "Utente ".concat(this.$store.getters.userRole) }}</div>
      </div>
    </v-card-item>
  </v-card>
  <AvatarChangePopup :visible="changeAvatar" @close="changeAvatar = false"></AvatarChangePopup>
</template>

<script>
  import ProfileAvatar from "vue-profile-avatar";
  import AvatarChangePopup from "@/views/profile/components/AvatarChangePopup.vue";
  export default {
    components: { ProfileAvatar, AvatarChangePopup },
    data() {
      return {
        changeAvatar: false,
      }
    },
    methods: {
      changeProfileImage() {
        this.changeAvatar = true;
      }
    }
  }
</script>

<style>
  .big-profile .text[data-v-ebbeb36a] {
    font-size: 60px;
  }
</style>