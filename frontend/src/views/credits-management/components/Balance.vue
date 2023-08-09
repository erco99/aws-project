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
              <v-form ref="form" validate-on="submit lazy" @submit.prevent="submit">
                <div class="currency-input-container">
                  <div class="font-weight-medium label-div" 
                    style="margin-bottom: 10px;">
                    Importo
                  </div>
                  <v-text-field 
                    placeholder="xx oppure xx,xx"
                    variant="outlined"
                    prepend-inner-icon="mdi-currency-eur"
                    type="text" 
                    id="currency-input" 
                    v-model="amountValue"
                    v-on:keypress="isNumber($event, amountValue)"
                    :rules="rules">
                  </v-text-field>
                </div>
                  <v-btn
                    outlined 
                    color="green"
                    block
                    class="me-4"
                    text="Conferma"
                    style="margin: 10px 0 10px 0"
                    :loading="loading"
                    type="submit"
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
    ...mapGetters([
      "userBalance", 
      "userPaymentMethod",
      "userFullname",
      "userSurname",
      "userEmail"]),
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
      if(value.includes(',')){
        if (!/\d/.test(event.key)) {
          return event.preventDefault(); 
        }
      } else  if (!/\d/.test(event.key) &&  (event.key !== "," || /\./.test(value))) {
        return event.preventDefault(); 
      }

      if (/\,\d{2}/.test(value)) return event.preventDefault(); 
    },
    async submit (event) {
      this.loading = true

      const results = await event

      this.loading = false

    },
    async checkApi (amountValue) {
      return new Promise(resolve => {
        clearTimeout(this.timeout)

        this.timeout = setTimeout(() => {
          if (!amountValue) {
            return resolve('Il campo non può essere vuoto')
          }

          if (amountValue.replace(/[^,]/g, "").length == 1){
            let integer_part = amountValue.split(',')[0];
            let decimal_part = amountValue.split(',')[1];

            //check if both integer and decimal parts contain only digits
            if (/^\d+$/.test(integer_part) && /^\d+$/.test(decimal_part)) {
              if (decimal_part.length > 2) {
                return resolve("Formato non valido")
              } else if(decimal_part.length == 1) {
                amountValue += '0'
              }
            }
          } else if(amountValue.replace(/[^,]/g, "").length == 0) {
            if (/^\d+$/.test(amountValue) == false) {
              return resolve("Inserire un numero nel formato valido")
            } else {
              amountValue += ',00'
            }
          } else {
              return resolve("Inserire un numero nel formato valido")
          }

          amountValue = amountValue.replace(/^0+/, '');



          const currentTime = new Date();

          console.log(this.userEmail)
          
    

          const data = {
            amount: this.amountValue,
            date: currentTime.getDate().toString() + '/' 
            + currentTime.getMonth().toString() + '/'
            + currentTime.getFullYear.toString(),
            time: currentTime.getHours().toString() + ":"
            + currentTime.getMinutes().toString() + ":"
            + currentTime.getSeconds().toString(),
            user: {
              name: this.userFullname,
              email: this.userEmail
            }
          }

          this.$store.dispatch('user/depositMoney', data)

          console.log(amountValue)

          return resolve(true)
        }, 1000)
      })
    }
  },
  data: vm => ({
    dialog: false,
    operationType: '',
    amountValue: '',
    loading: false,
    rules: [value => vm.checkApi(value)],
    timeout: null,
  })
};
</script>