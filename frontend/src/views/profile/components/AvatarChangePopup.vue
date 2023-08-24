<template>
  <v-dialog :model-value="visible" scrollable persistent width="500" height="600">
    <v-card class="imageDialog">
      <v-card-title class="max-auto justify-center text-center"> Modifica l'immagine del tuo profilo </v-card-title>
      <v-card-text class="images">
      <v-row v-for="(item, typeNumber) in imagesTypes" :key="item" no-gutters>
        <v-col cols="12" style="vertical-align: text-top">
          <div class="imagesHeader">{{ item.toUpperCase() }}</div>
        </v-col>
        <v-col v-for="(image, imageNumber) in map.get(item)" :key="image" cols="12" sm="6">
          <v-card class="elevation-0 ma-0 pa-0 rounded-lg" :color="this.cardColor(this.getGlobalIndex(imageNumber, typeNumber))">
            <v-card-item class="justify-center">
              <v-img
                  width="150px"
                  :src="image"
                  @click="this.selectedImage = { path: image, index: this.getGlobalIndex(imageNumber, typeNumber) };"></v-img>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
      </v-card-text>
      <v-card-actions class="justify-center pt-5">
        <v-btn color="primary" @click="this.$emit('close')">Annulla</v-btn>
        <v-btn
            color="primary"
            @click="this.saveImage()"
        >Salva</v-btn>
        <v-btn
            :disabled="!this.$store.getters.userAvatar"
            color="primary"
            @click="this.selectedImage = {path: '', index: -1 }; this.saveImage()"
        >Elimina immagine</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import store from "@/store";
  import { VInfiniteScroll } from "vuetify/labs/components";

  export default {
    emits: ["close"],
    components: { VInfiniteScroll },
    props: {
      visible: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        rootPath: "avatar-images",
        imagesTypes: ["persons", "animals"],
        imageQuantity: [9, 15],
        map: new Map(),
        selectedImage: {
          index: -1,
          path: ''
        },
        selectedCardColor: "blue-lighten-4",
        defaultCardColor: "white"
      }
    },
    mounted() {
      this.getImages();
    },
    methods: {
      saveImage() {
        // If no image is selected the save don't have effect
        if (this.selectedImage.index === -1) this.$emit('close')

        store.dispatch("user/changeAvatar", this.selectedImage.path);
        this.$emit('close')
      },
      getImages() {
        // Specific function for profiles images inside 'avatar-images' folder
        for (const [i, imageType] of this.imagesTypes.entries()) {
          const images = [];
          for (let n = 1; n <= this.imageQuantity[i]; n++) {
            images.push([this.rootPath, imageType, (n < 10 ? "0".concat(n.toString()) : n.toString()) + ".png"].join("/"))
          }
          this.map.set(imageType, images)
        }
      },
      cardColor(index) {
        return index === this.selectedImage.index ? this.selectedCardColor : this.defaultCardColor;
      },
      getGlobalIndex(index, group) {
        return index + group * this.imageQuantity[group];
      }
    }
  }
</script>

<style>
  html {
    overflow: hidden !important;
  }

  .imageDialog {
    display: flex !important;
    flex-direction: column;
  }

  .images {
    flex-grow: 1;
    overflow: auto;
  }

  .imagesHeader {
    border-radius: 3px;
    padding-left: 4px;
    font-weight: bold;
    color: white;
    background-color: #90A4AE;
    vertical-align: text-top;
  }
</style>