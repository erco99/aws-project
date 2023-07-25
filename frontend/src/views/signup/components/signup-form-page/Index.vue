<template>

  <v-card-text :style="{visibility: visible}">
    <v-form @submit.prevent="signup">

      <div class="text-center text-medium-emphasis text-subtitle-1 font-weight-bold pb-8 pt-5">ASD Forum Tennis</div>

      <v-alert density="compact" closable text="L'account esiste già" variant="tonal" color="error" v-model="alert"></v-alert>

      <FullNameField v-model:full_name="full_name.value.value" v-model:error="full_name.errorMessage.value"></FullNameField>

      <EmailField v-model:email="email.value.value" v-model:error="email.errorMessage.value"></EmailField>

      <NumberField v-model:number="number.value.value" v-model:error="number.errorMessage.value"></NumberField>

      <PasswordField
          v-model:password="password.value.value"
          v-model:error="password.errorMessage.value"
          placeholder="Password"
      ></PasswordField>

      <PasswordField
          v-model:password="retypePassword.value.value"
          v-model:error="retypePassword.errorMessage.value"
          placeholder="Conferma password"
      ></PasswordField>

      <CertAcceptField v-model:accept="certAccept.value.value" v-model:error="certAccept.errorMessage.value"></CertAcceptField>

      <SignupButton :loading="signupButtonLoading"></SignupButton>

      <AlreadyRegisteredRef></AlreadyRegisteredRef>

    </v-form>
  </v-card-text>
</template>

<script>
  import FullNameField from "@/views/signup/components/signup-form-page/fields/FullNameField.vue";
  import EmailField from "@/views/signup/components/signup-form-page/fields/EmailField.vue";
  import NumberField from "@/views/signup/components/signup-form-page/fields/NumberField.vue";
  import PasswordField from "@/views/signup/components/signup-form-page/fields/PasswordField.vue";
  import SignupButton from "@/views/signup/components/signup-form-page/fields/SignupButton.vue";
  import CertAcceptField from "@/views/signup/components/signup-form-page/fields/CertAcceptField.vue";
  import AlreadyRegisteredRef from "@/views/signup/components/email-verify-page/fields/AlreadyRegisteredRef.vue";
  import {useField, useForm} from "vee-validate";
  import {useStore} from "vuex";
  import {ref} from "vue";
  export default {
    props: ['visible'],
    components: {
      FullNameField,
      EmailField,
      NumberField,
      PasswordField,
      SignupButton,
      CertAcceptField,
      AlreadyRegisteredRef
    },
    setup(props, context) {
      const {handleSubmit, handleReset} = useForm({
        validationSchema: {
          full_name (value) {
              if (/[a-zA-Z]+\s+[a-zA-Z]+$/i.test(value)) return true
              return "Il nome ed il cognome devono essere validi"
          },
          email (value) {
            if (/^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
            return 'L\'email deve essere valida.'
          },
          number (value) {
            if (value?.length === 10 && /^[0-9]*$/.test(value)) return true
            return 'Il numero di telefono deve essere valido'
          },
          password (value) {
            // Regex for minimum 8, at least one upper case letter,
            // one lowercase letter, one number and one special character:
            // "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
            if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(value)) return true
            return 'La password deve essere di almeno 8 caratteri e contenere numeri, ' +
                'lettere minuscole e maiuscole ed almeno un carattere speciale'
          },
          retypePassword (value) {
            if (value === password.value.value) return true
            return 'Le password non coincidono'
          },
          certAccept (value) {
            if (value) return true
            return "E' necessario accettare i certificati per eseguire la registrazione"
          }
        }
      })
      const full_name = useField('full_name')
      const email = useField('email')
      const number = useField('number')
      const password = useField('password')
      const retypePassword = useField('retypePassword')
      const certAccept = useField('certAccept')
      const signupButtonLoading = ref(false)

      // Default val for debug
      full_name.value.value = "Utente Test"
      email.value.value = "miho@lybyz.com"
      number.value.value = "2668945637"
      password.value.value = "123er56#"
      retypePassword.value.value = "123er56#"

      const alert = ref(false);

      const store = useStore()
      const signup = handleSubmit((values) => {
        signupButtonLoading.value = true;
        store.dispatch('user/register', values).then(responseData => {
          context.emit('onSubmit', email.value.value);
          console.log("Register OK")
        }).catch(error => {
          signupButtonLoading.value = false;
          switch (error.response.status) {
            case 409:
              alert.value = true; break;
            default:
              console.log(error); break;
          }
        })
      })

      return {full_name, email, number, password, retypePassword, certAccept, alert, signup, signupButtonLoading}
    }
  }
</script>

