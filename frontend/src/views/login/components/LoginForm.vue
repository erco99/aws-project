<template>
  <v-card-text>
    <v-form @submit.prevent="submit">

      <div class="text-center text-medium-emphasis text-subtitle-1 font-weight-bold">ASD Forum Tennis</div>

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
import { ref, inject } from 'vue';
import {useField, useForm} from 'vee-validate';
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
          if (value?.length >= 8) return true
          return 'La password deve contenere almeno 8 caratteri'
        }
      },
    })
    const email = useField('email')
    const password = useField('password')
    const staySignedIn = ref(false);

    const axios = inject('axios');
    const submit = handleSubmit((values) => {
      axios.post('/auth/login', values);
    })

    return {email, password, staySignedIn, submit}
  },
}
</script>

<style>
  .v-messages__message {
    text-align: start;
  }
</style>