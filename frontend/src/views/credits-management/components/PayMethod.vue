<template>
    <v-card class="mx-auto rounded-0" elevation="4">
      <v-card-item>
          <div class="text-overline mb-1">
            Metodo di pagamento
          </div>
      </v-card-item>

      <div>
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
            <v-form validate-on="submit lazy" @submit.prevent="submit">
              <div class="font-weight-medium label-div">Numero carta</div>
              <v-text-field 
                placeholder="xxxx-xxxx-xxxx-xxxx"
                density="compact"
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
                v-model="valueFields.cardName"
                variant="outlined">
              </v-text-field>
              <v-row>
                <v-col cols="8">
                  <div class="font-weight-medium label-div">Scadenza carta</div>
                  <div style="display: flex">
                    <v-select
                      label="Mese"
                      style="margin-right: 15px"
                      density="compact"
                      variant="outlined"
                      v-model="valueFields.cardMonth"
                      :items="months"></v-select>
                    <v-select 
                      label="Anno"
                      density="compact"
                      variant="outlined"
                      v-model="valueFields.cardYear"
                      :items="years"></v-select>
                  </div>
                </v-col>
                <v-col>
                  <div class="font-weight-medium label-div">CVV/CVC</div>
                  <v-text-field 
                    placeholder="xxx"
                    density="compact"
                    variant="outlined"
                    v-model="valueFields.cardCvv"></v-text-field>
                </v-col>
              </v-row>
                  <v-btn
                    outlined 
                    color="green"
                    :loading="loading"
                    type="Submit"
                    block
                    class="me-4"
                    text="Conferma"
                    style="margin-bottom: 10px"
                  ></v-btn>
                  <v-btn
                    outlined
                    color="red"
                    :loading="loading"
                    type="Cancel"
                    block
                    @click="dialog = false"
                    text="Annulla"
                  ></v-btn>
      

            </v-form>
          </v-card-text>
          </v-card>
        </v-dialog>
      </div>

      <div class="text-caption">
        <v-card-item>
          <v-btn variant="outlined">
            Deposita
          </v-btn>
          <v-btn variant="outlined">
            Ritira
          </v-btn>
          <v-btn variant="outlined">
            Invia
          </v-btn>
        </v-card-item>
      </div>
    </v-card>
</template>

<script>
import VuePaycard from "vue-paycard/vue-paycard"

export default {
  components: {
    VuePaycard
  },
  mounted() {
    let currentYear = new Date().getFullYear();
    this.months = new Array(12).fill(0).map((n,i)=>(i+1))
    for(let i=currentYear; i < currentYear + 15; i++) {
      this.years.push(i)
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
    amount: 8
  }),
  computed: {
    formatCardNumber(){
      return this.valueFields.cardNumber ? this.valueFields.cardNumber.match(/.{1,4}/g).join(' ') : '';
    } 
  },
  methods: {
    updateValue(e){
      this.valueFields.cardNumber = e.target.value.replace(/ /g,'');
       const value = e.target.value
      console.log(value, this.amount)
      if (String(value).length <= 10) {
        this.amount = value
      }
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
  }

}

              //<vue-paycard :value-fields="valueFields"
            //:has-random-backgrounds="false" />
</script>

<style scoped>
.label-div {
  margin-bottom: 10px;
}
</style>