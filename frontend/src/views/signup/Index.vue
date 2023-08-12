<template>
  <BgImage></BgImage>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col>
        <v-card
            class="mx-auto pa-5"
            elevation="3"
            rounded="lg"
            width="400px"
            :min-height="step === 1 ? '750px' : step === 2 ? '500px' : '350px'"
            min-width="400px"
            max-width="400px"
        >
          <PageNumber v-model:step="step"></PageNumber>

          <SignupForm @onSubmit="onSubmit" v-if="step === 1" v-model="step">
          </SignupForm>

          <EmailVerifyForm @onCancel="reset" @onVerify="this.step++" v-if="step === 2" v-model="step" :userEmail="userEmail"></EmailVerifyForm>

          <ConfirmPage v-if="step === 3"></ConfirmPage>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignupForm from "@/views/signup/components/signup-form-page/Index.vue";
import PageNumber from "@/views/signup/components/commons/PageNumber.vue";
import EmailVerifyForm from "@/views/signup/components/email-verify-page/Index.vue";
import ConfirmPage from "@/views/signup/components/confirm-page/Index.vue";
import BgImage from "@/components/bg-image/Index.vue";
export default {
  components: {
    PageNumber,
    SignupForm,
    EmailVerifyForm,
    ConfirmPage,
    BgImage
  },
  data: () => ({
    step: 1,
    userEmail: "",
  }),
  methods: {
    onSubmit(userEmail) {
      this.userEmail = userEmail;
      this.step++;
    },
    reset() {
      this.step = 1
    }
  }
}
</script>