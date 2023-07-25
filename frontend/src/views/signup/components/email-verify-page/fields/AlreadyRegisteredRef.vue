 <template>
  <v-card-text class="text-center" style="padding: 0">
                <span class="text-medium-emphasis text-subtitle-2">
                Sei gia' iscritto?
                <a
                    class="text-blue text-decoration-none"
                    href="#"
                    rel="noopener noreferrer"
                    @click="this.$router.push({path: '/login'})"
                >Accedi <v-icon icon="mdi-chevron-right"></v-icon></a></span>
  </v-card-text>
</template>
