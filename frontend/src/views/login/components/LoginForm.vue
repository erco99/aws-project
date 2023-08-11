<template>
  <v-card-text>
    <v-form @submit.prevent="submit">

      <div class="text-center text-medium-emphasis text-subtitle-1 font-weight-bold pb-10">ASD Forum Tennis</div>

      <v-fade-transition>
      <v-alert closable text="Incorrect email of password." variant="tonal" color="error" v-model="alert"></v-alert>
      </v-fade-transition>

      <EmailField v-model:email="email.value.value" v-model:error="email.errorMessage.value">prova</EmailField>

      <PasswordField v-model:password="password.value.value" v-model:error="password.errorMessage.value"></PasswordField>

      <ForgotPassword></ForgotPassword>

      <SubmitButton :loading="signinButtonLoading"></SubmitButton>

      <SignUpRef @signup="signup"></SignUpRef>
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
import { useRouter } from 'vue-router';
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
          if (/^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
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

    // Default values for debug
    email.value.value = "enrico.lumini@studio.unibo.it"
    password.value.value = "123456s#"

    const alert = ref(false);
    const signinButtonLoading = ref(false);

    const store = useStore();
    const router = useRouter();

    const submit = handleSubmit((values) => {
      alert.value = false
      signinButtonLoading.value = true;
      store.dispatch('user/login', values).then(
          () => {
            console.log("Login OK")
            router.push({ path: '/' })
          },
          (error) => {
            signinButtonLoading.value = false;
            switch(error.response.status) {
              case 401:
                alert.value = true; break;
              default:
                console.log(error); break;
            }
          })
    })

    return {email, password, alert, submit, signinButtonLoading}
  },
  methods: {
    signup: function() {
      this.$router.push("/signup")
    }
  }
}
</script>

<style>
  .v-messages__message {
    text-align: start;
  }
</style>