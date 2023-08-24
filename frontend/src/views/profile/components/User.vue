<template>
  <v-card class="mx-auto rounded-4" elevation="4">
    <v-card-item class="justify-center">
      <div>
        <div class="text-overline mb-1 justify-center text-center">
          PROFILO UTENTE
        </div>
        <v-container style="display: flex; align-items: center; flex-direction: column">
          <div class="imageContainer"
               @mouseover = "this.wantToChangeAvatar = true"
               @mouseleave="this.wantToChangeAvatar = false"
               @click="this.changeProfileImage()">
            <profile-avatar
                v-if="!this.$store.getters.userAvatar || this.$store.getters.userAvatar === ''"
                :class="'big-profile '.concat(this.wantToChangeAvatar ? 'hover' : '')"
                :username="this.$store.getters.userFullname"
                customSize="150px"></profile-avatar>
            <v-img v-else
                :class="this.wantToChangeAvatar ? 'hover' : ''"
                :src="this.$store.getters.userAvatar"
                width="150px"></v-img>
            <v-icon
                v-if="this.wantToChangeAvatar"
                icon="mdi-pencil-outline"
                style="font-size: 30px"
                color="grey-darken-3"></v-icon>
          </div>
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
        wantToChangeAvatar: false
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

  .hover {
    filter: blur(1.5px);
  }

  .imageContainer {
    position: relative;
  }

  .imageContainer i {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 10;
  }

</style>