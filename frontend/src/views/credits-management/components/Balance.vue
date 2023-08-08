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
        @click="dialog = true; operationType='deposito'"     
        color="green-darken-4"
        style="margin-right: 5px"
        width="150"
      >
        Deposita
      </v-btn>
      <v-btn 
        @click="dialog = true; operationType='ritiro'"
        color="red-darken-4" 
        style="margin-right: 5px" 
        width="150">
        Ritira
      </v-btn>
      <v-btn 
        @click="dialog = true; operationType='invio'"
        color="yellow-darken-4" 
        width="150"> 
        Invia </v-btn>
    </v-card-item>

     <v-dialog
          persistent
          v-model="dialog"
          width="500">
      <v-card>
        <v-card-item>
              <div class="text-overline mb-1">
                {{ operationType }} denaro
              </div>
            </v-card-item>
            <v-divider></v-divider>
            <v-card-text class="pa-5">
              <v-form ref="form">
                <div class="currency-input-container">
                  <div class="font-weight-medium label-div" 
                    style="margin-bottom: 10px;">
                    Importo
                  </div>
                  <v-text-field 
                    variant="outlined"
                    prepend-inner-icon="mdi-currency-eur"
                    type="text" 
                    id="currency-input" 
                    v-model="amountValue"
                    v-on:keypress="isNumber($event, amountValue)">
                  </v-text-field>
                </div>
                <v-btn
                    outlined 
                    color="green"
                    block
                    class="me-4"
                    text="Conferma"
                    style="margin-bottom: 10px"
                  ></v-btn>
                  <v-btn
                    outlined
                    color="red"
                    block
                    @click="cancel"
                    text="Annulla"
                  ></v-btn>
              </v-form>
            </v-card-text>
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
    cancel() {
      this.dialog = false
      this.$refs.form.reset()
    },
    isNumber(event, value) {
      if (!/\d/.test(event.key) &&  (event.key !== "," || /\./.test(value))) {
        return event.preventDefault(); 
      }

      if (/\,\d{2}/.test(value)) return event.preventDefault(); 
    },
  },
  data: () => ({
    dialog: false,
    operationType: '',
    amountValue: ''
  })
};
</script>