<template>
  <v-card-text :style="{visibility: visible}">
    <v-form @submit.prevent="verify">
      <div class="text-center text-medium-emphasis text-h6 font-weight-bold pb-8 pt-2">
        Conferma la validità del tuo indirizzo Email
      </div>

      <div class="text-center text-medium-emphasis text-subtitle-1 font-weight-bold pt-5">
        Controlla la tua Email
      </div>

      <div class="text-center text-caption text-subtitle-1 font-weight-bold pt-2">
        Inserisci il codice che ti abbiamo inviato a {{ userEmail }}
      </div>

      <v-alert closable density="compact" :text="alertText" variant="tonal" :color="alertType" v-model="alertVisible"></v-alert>

      <OtpField
          v-model:otp="otp.value.value"
          v-model:error="otp.errorMessage.value"
          :disabled="disablePage"
          @onVerify="verify"></OtpField>

      <a
          class= "text-caption text-decoration-none text-blue pl-3"
          href="#"
          :style=" disablePage ? 'pointer-events: none; cursor: default;' : ''"
          rel="noopener noreferrer"
          @click.prevent="resendOTP">Reinvia OTP
      </a>

      <CancelButton @onCancelStarted="cancelRegister"></CancelButton>

    </v-form>
  </v-card-text>
</template>

<script>
  import OtpField from "@/views/signup/components/email-verify-page/fields/OtpField.vue";
  import VerifyButton from "@/views/signup/components/email-verify-page/fields/VerifyButton.vue";
  import CancelButton from "@/views/signup/components/email-verify-page/fields/CancelButton.vue";
  import {useField, useForm} from "vee-validate";
  import {ref} from "vue";
  import {useStore} from "vuex";
  export default {
    props: ["visible", "userEmail"],
    emits: ["onVerify", "onCancel"],
    components: {
      OtpField,
      VerifyButton,
      CancelButton
    },
    setup( props, context ) {
      const {handleSubmit, handleReset} = useForm({
        validationSchema: {
          otp(value) {
            if (value?.length === 6) return true
            return "Il codice inserito non e' valido"
          }
        }
      })
      const otp = useField('otp')

      const alertType = ref("error")
      const alertVisible = ref(false)
      const alertText = ref("")
      const disablePage = ref(false)

      const store = useStore()
      const verify = handleSubmit((values) => {
        store.dispatch('user/verifyOTP', {
          'email': props.userEmail,
          'otp': values.otp}).then(() => {
          console.log("OTP verified correctly")
          context.emit('onVerify')
        }).catch(error => {
          switch (error.response.status) {
            case 401:
              alert("Il codice inserito non e' corretto", false)
              break
            case 410:
              if (error.response.data.code === "otp-expired") {
                alert("L'OTP inserito è scaduto. Torna alla pagina di signup per rieseguire la registrazione.", true)
              } else if (error.response.data.code === "otp-max-attempts") {
                alert("Numero massimo di tentativi raggiunto. " +
                    "Torna alla pagina di signup per rieseguire la registrazione o richiedi un nuovo codice.", false)
              }
              break
            case 500:
              alert("Errore durante la verifica. Torna alla pagina di signup per rieseguire la registrazione.", true)
              break
            default:
              console.log(error); break;
          }
        })
      })

      // Support function for alert
      const alert = function(text, disable, type = "error") {
        alertType.value = type
        alertText.value = text
        alertVisible.value = true
        disablePage.value = disable
      }

      return { otp, alertType, alertVisible, alertText, verify, disablePage, alert }
    },
    methods: {
      cancelRegister: function () {
        console.log("cancel register")
        this.$store.dispatch('user/cancelRegistration', {email: this.userEmail}).then(() => {
          this.$emit('onCancel')
        }).catch(error => {
          console.log(error)
        })
      },
      resendOTP: function() {
        this.$store.dispatch('user/newOTP', {email: this.userEmail}).then(() => {
          // Notify the user that a new otp has been sent
          this.alert("Nuovo OTP inviato correttamente", false, "success")
        }).catch(error => {
          switch (error.response.status) {
            case 410:
              if (error.response.data.code === "otp-expired") {
                this.alert("L'OTP inviato in precedenza è scaduto, non è possibile pertanto inviarne uno nuovo. " +
                    "Torna alla pagina di signup per rieseguire la registrazione.", true)
              }
              break
            default:
              console.log(error); break;
          }
        })
      }
    }
  }
</script>