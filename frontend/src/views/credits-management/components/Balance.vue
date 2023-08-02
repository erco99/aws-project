<template>
    <v-card class="mx-auto rounded-0" elevation="4">
      <v-card-item>
        <div>
          <div class="text-overline mb-1">
            Saldo
          </div>
          <div class="text-h6 mb-1">
            <div class="text-h3 font-weight-medium">€ {{ userBalance }}</div>
          </div>
        </div>
      </v-card-item>

    </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'userBalance'
    ]),
  },
  
}
</script>