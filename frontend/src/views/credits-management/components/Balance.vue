<template>
  <v-card class="mx-auto rounded-0" elevation="4">
    <v-card-item>
      <div>
        <div class="text-overline mb-1">Saldo</div>
        <div class="text-h6 mb-1">
          <div class="text-h3 font-weight-medium">€ {{ userBalance }}</div>
        </div>
      </div>
    </v-card-item>
    <v-card-item v-if="userPaymentMethod == null">
      <p class="font-weight-medium">
        Inserire un metodo di pagamento per depositare, ritirare o inviare  
        denaro
      </p>
    </v-card-item>  
    <v-card-item v-else>
      <v-btn
        @click="dialog = true; operationType='deposit'"     
        color="green-darken-4"
        style="margin-right: 5px"
        width="150"
      >
        Deposita
      </v-btn>
      <v-btn 
        @click="dialog = true; operationType='withdraw'"
        color="red-darken-4" 
        style="margin-right: 5px" 
        width="150">
        Ritira
      </v-btn>
      <v-btn 
        @click="dialog = true; operationType='send'"
        color="yellow-darken-4" 
        width="150"> 
        Invia </v-btn>
    </v-card-item>

     <v-dialog
          persistent
          v-model="dialog"
          width="500">
      <v-card>
        {{operationType}}
      </v-card>
     </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["userBalance", "userPaymentMethod"]),
  },
  methods: {
    sendCredit() {
      console.log(this.$store.getters.userPaymentMethod);
    },
  },
  data: () => ({
    dialog: false,
    operationType: ''
  })
};
</script>