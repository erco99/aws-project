<template>
    <v-card class="mx-auto rounded-0" elevation="4">
      <v-card-item>
          <div class="text-overline mb-1">
            Metodo di pagamento
          </div>
      </v-card-item>

      <div v-if="userPaymentMethod==null">
        <v-card-item>
          Nessun metodo di pagamento registrato
        </v-card-item>

        <v-card-item>
                <v-btn          
            color="primary"
            @click="dialog = true; " 
            variant="outlined">
            Aggiungi
          </v-btn>
        </v-card-item>

        <v-dialog
          persistent
          v-model="dialog"
          width="500">
          <v-card>
            <v-card-item>
              <div class="text-overline mb-1">
                Inserimento metodo di pagamento
              </div>
            </v-card-item>
            <v-divider></v-divider>
            <v-card-text class="pa-5">
              <v-form ref="form">
                <div class="font-weight-medium label-div">Numero carta</div>
                  <v-text-field 
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    density="compact"
                    :rules="cardNumberRules"
                    :value="formatCardNumber"
                    @input="updateValue"
                    v-model="valueFields.cardNumber" 
                    @keypress="isNumber($event)"
                    maxlength="19"
                    variant="outlined">
                  </v-text-field>
                  <div class="font-weight-medium label-div">Titolare carta</div>
                  <v-text-field 
                    placeholder="es. Mario Rossi"
                    density="compact"
                    :rules="cardNameRules"
                    v-model="valueFields.cardName"
                    variant="outlined">
                  </v-text-field>
                  <v-row style="margin-bottom: 5px">
                    <v-col cols="8">
                      <div class="font-weight-medium label-div">Scadenza carta</div>
                      <div style="display: flex">
                        <v-select
                          label="Mese"
                          style="margin-right: 15px"
                          density="compact"
                          variant="outlined"
                          v-model="valueFields.cardMonth"
                          :items="months"
                          :rules="dateYearRules"></v-select>
                        <v-select 
                          label="Anno"
                          density="compact"
                          variant="outlined"
                          v-model="valueFields.cardYear"
                          :items="years"
                          :rules="dateYearRules"></v-select>
                      </div>
                    </v-col>
                    <v-col>
                      <div class="font-weight-medium label-div">CVV/CVC</div>
                      <v-text-field 
                        maxlength="3"
                        placeholder="xxx"
                        density="compact"
                        variant="outlined"
                        v-model="valueFields.cardCvv"
                        :rules="cardCvvRules"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-btn
                    outlined 
                    color="green"
                    block
                    class="me-4"
                    text="Conferma"
                    @click="validate"
                    style="margin-bottom: 10px"
                  ></v-btn>
                  <v-btn
                    outlined
                    color="red"
                    block
                    @click="cancelPayInsert"
                    text="Annulla"
                  ></v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>

      <div class="paycard" v-else>
        <vue-paycard :value-fields="valueFields"
            :has-random-backgrounds="false"
            style="margin-bottom:15px"/>
      </div>
    </v-card>
</template>

<script>
import VuePaycard from "/src/components/vue-paycard/vue-paycard.js"
import { mapGetters } from 'vuex';

export default {
  components: {
    VuePaycard
  },
  mounted: function() {
    let currentYear = new Date().getFullYear();
    this.months = new Array(12).fill(0).map((n,i)=>(i+1))
    for(let i=currentYear; i < currentYear + 15; i++) {
      this.years.push(i)
    }

    if(this.$store.getters.userPaymentMethod != null) {
      this.valueFields.cardName = this.$store.getters.userPaymentMethod.card_owner

      let number = this.$store.getters.userPaymentMethod.card_number.toString()
      this.valueFields.cardNumber = number.match(/.{1,4}/g).join(" ")

      let exp_date = this.$store.getters.userPaymentMethod.card_expiration.toString()
      this.valueFields.cardMonth = exp_date.split("/")[0]  
      this.valueFields.cardYear = exp_date.split("/")[1]

      this.valueFields.cardCvv = this.$store.getters.userPaymentMethod.card_cvv.toString()
    } else {
      console.log("dsds")
    }
  },
  data: () => ({
    valueFields: {
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
    },
    dialog: false,
    months: [],
    years: [],
    loading: false,
    cardNumberRules: [
      value => {
        if(value?.length == 16) return true
        return 'Numero non valido'
      }
    ],
    cardNameRules: [
      v => !!v || 'Il campo non può essere vuoto'
    ],
    dateYearRules: [
      v => !!v || 'Campo obbligatorio'
    ],
    cardCvvRules: [
      value => {
        if(value?.length == 3) return true
        return 'cvv/cvc non valido'
      }
    ]
  }),
  computed: {
    ...mapGetters([
      'userPaymentMethod'
    ]),
    formatCardNumber(){
      return this.valueFields.cardNumber ? this.valueFields.cardNumber.match(/.{1,4}/g).join(' ') : '';
    } 
  },
  methods: {
    cancelPayInsert() {
      this.dialog = false
      this.$refs.form.reset()
    },
    updateValue(e){
      this.valueFields.cardNumber = e.target.value.replace(/ /g,'');
      this.$forceUpdate()
    },
    isNumber(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode

      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        evt.preventDefault()
      } else {
        return true;
      }
    },
    async validate () {
      this.loading = true
      
        const { valid } = await this.$refs.form.validate()
        if (valid) {
          alert('Form is valid')

          let data = {
            card_number: this.valueFields.cardNumber,
            card_owner: this.valueFields.cardName,
            card_expiration: "0"+this.valueFields.cardMonth+"/"+this.valueFields.cardYear,
            card_cvv: this.valueFields.cardCvv
          }
          this.$store.dispatch('user/paymentMethodInsert', data)
          this.dialog = false
          this.$refs.form.submit();
        }
    }
  }

}
</script>

<style scoped>
.label-div {
  margin-bottom: 10px;
}
</style>