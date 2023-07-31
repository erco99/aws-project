<template>
  <v-sheet class="pa-2 ma-2">
    <v-img
      :width="60"
      aspect-ratio="16/9"
      cover
      src="src/assets/logo/logo_alone.png"
      v-if="this.$vuetify.display.xs"
    ></v-img>
    <v-img
      :width="200"
      aspect-ratio="16/9"
      cover
      src="src/assets/logo/logo_transparent.png"
      v-else
    ></v-img>
  </v-sheet>
</template>

<script>
export default {
  name: "Appbarlogo",
}
</script>
