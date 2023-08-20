<template>
  <v-card class="mx-auto rounded-0" elevation="4">
    <v-card-item>
      <div>
        <div class="text-overline mb-1">Saldo</div>
        <div class="text-h6 mb-1">
          <div class="text-h3 font-weight-medium">€ {{ balance }}</div>
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
        @click="
          dialog = true;
          operationTypeText = 'Deposito';
          operationType = 'positive';
        "
        color="green-darken-4"
        style="margin-right: 5px"
        width="150">
        Deposita
      </v-btn>
      <v-btn
        @click="
          dialog = true;
          operationTypeText = 'Ritiro';
          operationType = 'negative';
        "
        color="red-darken-4"
        style="margin-right: 5px"
        width="150">
        Ritira
      </v-btn>
      <v-btn
        @click="
          dialog = true;
          operationTypeText = 'Invio';
          operationType = 'send';
        "
        color="yellow-darken-4"
        width="150">
        Invia
      </v-btn>
    </v-card-item>

    <v-dialog persistent v-model="dialog" width="500">
      <v-card>
        <v-card-item>
          <div class="text-overline mb-1">{{ operationTypeText }} denaro</div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text class="pa-5">
          <v-form ref="form" validate-on="submit lazy" @submit.prevent="submit">
            <div class="currency-input-container">
              <v-alert
                v-model="alert"
                close-text="Close Alert"
                color="deep-red accent-4"
                closable
                >Email inesistente</v-alert
              >
              <div
                class="font-weight-medium label-div"
                style="margin-bottom: 10px">
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
              <div v-if="operationType == 'send'">
                <div
                  class="font-weight-medium label-div"
                  style="margin-bottom: 10px">
                  Email destinatario
                </div>
                <v-text-field
                  placeholder="Es. mariorossi@gmail.com"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  type="text"
                  v-model="receiverEmail">
                </v-text-field>
              </div>
            </div>
            <v-btn
              outlined
              color="green"
              block
              class="me-4"
              text="Conferma"
              style="margin: 10px 0 10px 0"
              :loading="loading"
              type="submit"></v-btn>
            <v-btn
              outlined
              color="red"
              block
              @click="cancel"
              text="Annulla"></v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import io from "socket.io-client";

export default {
  computed: {
    ...mapGetters([
      "userBalance",
      "userPaymentMethod",
      "userFullname",
      "userSurname",
      "userEmail",
    ]),
  },
  methods: {
    sendCredit() {
      console.log(this.$store.getters.userPaymentMethod);
    },
    cancel() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    isNumber(event, value) {
      if (value.includes(",")) {
        if (!/\d/.test(event.key)) {
          return event.preventDefault();
        }
      } else if (
        !/\d/.test(event.key) &&
        (event.key !== "," || /\./.test(value))
      ) {
        return event.preventDefault();
      }

      if (/\,\d{2}/.test(value)) return event.preventDefault();
    },
    async submit(event) {
      this.loading = true;

      const results = await event;

      this.loading = false;
    },
    async checkApi(amountValue) {
      return new Promise((resolve) => {
        clearTimeout(this.timeout);
        const currentTime = new Date();

        let month = parseInt(currentTime.getMonth()) + 1;

        this.timeout = setTimeout(() => {
          if (this.operationType != "send") {
            if (!amountValue) {
              return resolve("Il campo non può essere vuoto");
            }

            if (amountValue.replace(/[^,]/g, "").length == 1) {
              let integer_part = amountValue.split(",")[0];
              let decimal_part = amountValue.split(",")[1];

              //check if both integer and decimal parts contain only digits
              if (/^\d+$/.test(integer_part) && /^\d+$/.test(decimal_part)) {
                if (decimal_part.length > 2) {
                  return resolve("Formato non valido");
                } else if (decimal_part.length == 1) {
                  amountValue += "0";
                }
              }
            } else if (amountValue.replace(/[^,]/g, "").length == 0) {
              if (/^\d+$/.test(amountValue) == false) {
                return resolve("Inserire un numero nel formato valido");
              } else {
                amountValue += ",00";
              }
            } else {
              return resolve("Inserire un numero nel formato valido");
            }

            if (
              this.operationType == "negative" &&
              parseFloat(amountValue.replace(",", ".")) >
                parseFloat(this.userBalance)
            ) {
              return resolve(
                "Non è possibile ritirare un valore più alto del bilancio"
              );
            }

            amountValue = amountValue.replace(/^0+/, "");

            const data = {
              amount: this.amountValue,
              transaction_type: this.operationType,
              description: this.operationTypeText + " denaro conto",
              date:
                currentTime.getDate().toString() +
                "/" +
                month +
                "/" +
                currentTime.getFullYear().toString(),
              time:
                currentTime.getHours().toString() +
                ":" +
                currentTime.getMinutes().toString() +
                ":" +
                currentTime.getSeconds().toString(),
              user: {
                fullname: this.userFullname,
                email: this.userEmail,
              },
            };
            this.$store.dispatch("user/depositWithdrawMoney", data).then(() => this.balance = this.$store.getters.userBalance);
            this.dialog = false;
          } else {
            if (
              parseFloat(amountValue.replace(",", ".")) >
              parseFloat(this.userBalance)
            ) {
              return resolve(
                "Non è possibile inviare un valore più alto del bilancio"
              );
            }
            const data = {
              sender_data: {
                fullname: this.$store.getters.userFullname,
                email: this.$store.getters.userEmail,
                balance: this.$store.getters.userBalance,
              },
              receiver_data: {
                email: this.receiverEmail,
              },
              amount: this.amountValue,
              date:
                currentTime.getDate().toString() +
                "/" +
                month.toString() +
                "/" +
                currentTime.getFullYear().toString(),
              time:
                currentTime.getHours().toString() +
                ":" +
                currentTime.getMinutes().toString() +
                ":" +
                currentTime.getSeconds().toString(),
            };

            let wrong_email = 0;

            this.$store.dispatch("transactions/sendMoney", data).then(
              () => {
                this.dialog = false;
                this.$refs.form.submit();
              },
              (error) => {
                this.alert = true;
              }
            );
          }

          return resolve(true);
        }, 1000);
      });
    },
    updateUserBalance(data, sign) {
      const userEmail = this.$store.getters.userEmail
      if (data.owner && data.owner.email === userEmail || data.inviter && data.inviter === userEmail) {
        this.$store.commit('user/INC_USER_BALANCE', sign === '-' ?  - data.price : data.price)
      }
      const playersEmails = []
      if (data.players) {
        playersEmails.push(...data.players.map(player => player.email))
      } else if (data.owners) {
        playersEmails.push(...data.owners)
      }
      if (playersEmails.includes(userEmail) && !data.myTreat) {
        this.$store.commit('user/INC_USER_BALANCE', sign === '-' ?  - data.price : data.price);
      }
      this.balance = this.$store.getters.userBalance;
    }
  },
  data: function (vm){
    return {
      alert: false,
      receiverEmail: "",
      dialog: false,
      operationType: "",
      operationTypeText: "",
      amountValue: "",
      loading: false,
      rules: [(value) => vm.checkApi(value)],
      timeout: null,
      socket: io("http://localhost:10000"),
      balance: this.$store.getters.userBalance
    };
  },
  mounted() {
    this.socket.on("new-booking", (newBooking) => {
      this.updateUserBalance(newBooking.newBooking, '-');
    });
    this.socket.on("delete-booking", (deleteBooking) => {
      this.updateUserBalance(deleteBooking, '+');
    })
  },
  unmounted() {
    this.socket.disconnect();
  },
};
</script>
