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
        Inserisci il codice che ti abbiamo inviato a {{ otpData.email }}
      </div>

      <v-alert closable density="compact" text="Il codice inserito non e' corretto" variant="tonal" color="error" v-model="alert"></v-alert>

      <OtpField v-model:otp="otp.value.value" v-model:error="otp.errorMessage.value"></OtpField>

      <VerifyButton></VerifyButton>
    </v-form>
  </v-card-text>
</template>

<script>
  import OtpField from "@/views/signup/components/email-verify-page/fields/OtpField.vue";
  import VerifyButton from "@/views/signup/components/email-verify-page/fields/VerifyButton.vue";
  import {useField, useForm} from "vee-validate";
  import {ref} from "vue";
  import {useStore} from "vuex";
  export default {
    props: ["visible", "otpData"],
    components: {
      OtpField,
      VerifyButton
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

      const alert = ref(false)

      const store = useStore()
      const verify = handleSubmit((values) => {
        store.dispatch('user/verifyOTP', {
          'email': props.otpData.email,
          'otp': values.otp,
          'hash': props.otpData.otpHash}).then(() => {
          console.log("OTP verified correctly")
          context.emit('onVerify')
        }).catch(error => {
          switch (error.status) {
            case 401:
              alert.value = true; console.log("Wrong OTP"); break;
            default:
              console.log(error); break;
          }
        })
      })

      return { otp, alert, verify }
    }
  }
</script>