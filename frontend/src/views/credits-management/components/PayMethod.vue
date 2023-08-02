<template>
    <v-card class="mx-auto rounded-0" elevation="4">
      <v-card-item>
          <div class="text-overline mb-1">
            Metodo di pagamento
          </div>
            <vue-paycard :value-fields="valueFields"
            :has-random-backgrounds="false" />
      </v-card-item>
  
      <v-card-actions>
        <v-btn variant="outlined">
          Button
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
import VuePaycard from "vue-paycard/vue-paycard"

export default {
  components: {
    VuePaycard
  },
      data: () => ({
      valueFields: {
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: "",
      },
    }),

  
}
</script>