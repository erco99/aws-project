<template>
  <v-card-text>
    <v-form @submit.prevent="submit">

      <div class="text-center text-medium-emphasis text-subtitle-1 font-weight-bold pb-10">ASD Forum Tennis</div>

      <v-alert closable text="Incorrect email of password." variant="tonal" color="error" v-model="alert"></v-alert>

      <EmailField v-model:email="email.value.value" v-model:error="email.errorMessage.value"></EmailField>

      <PasswordField v-model:password="password.value.value" v-model:error="password.errorMessage.value"></PasswordField>

      <v-checkbox class="pt-n10" v-model="staySignedIn" type="checkbox" label="Resta connesso"></v-checkbox>

      <ForgotPassword></ForgotPassword>

      <SubmitButton></SubmitButton>

      <SignUpRef></SignUpRef>
    </v-form>
  </v-card-text>
</template>

<script>
import { ref } from 'vue';
import {useField, useForm} from 'vee-validate';
import { useStore } from "vuex";
import EmailField from "@/views/login/components/fields/EmailField.vue";
import PasswordField from "@/views/login/components/fields/PasswordField.vue";
import SignUpRef from "@/views/login/components/fields/SignUpRef.vue";
import ForgotPassword from "@/views/login/components/fields/ForgotPassword.vue";
import SubmitButton from "@/views/login/components/fields/SubmitButton.vue";
export default {
  components: {
    EmailField,
    PasswordField,
    SignUpRef,
    ForgotPassword,
    SubmitButton
  },
  data: () => ({
    visible: false,
  }),
  setup() {
    const {handleSubmit, handleReset} = useForm({
      validationSchema: {
        email (value) {
          if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
          return 'L\'email deve essere valida.'
        },
        password (value) {
          if (value?.length >= 4) return true
          return 'La password deve contenere almeno 8 caratteri'
        }
      },
    })
    const email = useField('email')
    const password = useField('password')
    const staySignedIn = ref(false);
    const alert = ref(false);

   const store = useStore();
    const submit = handleSubmit((values) => {
      store.dispatch('user/login', values).then(
          () => {
            console.log("Login OK")
          },
          (error) => {
            switch(error.status) {
              case 401:
                alert.value = true; break;
              default:
                console.log(error.code); break;
            }
          })
    })

    return {email, password, staySignedIn, alert, submit}
  },
}
</script>

<style>
  .v-messages__message {
    text-align: start;
  }
</style>