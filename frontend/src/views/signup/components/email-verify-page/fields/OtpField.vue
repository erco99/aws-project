<template>
  <v-text-field
      class="pt-2"
      :value="otpUppercase"
      @keyup="uppercase"
      @input="$emit('update:otp', $event.target.value)"
      :error-messages="error"
      type="text"
      density="compact"
      placeholder="OTP"
      prepend-inner-icon="mdi-timer"
      variant="solo"
      rounded="xl"
  ></v-text-field>
</template>

<script>
export default {
  props: ['otp', 'error'],
  emit: ['update:otp'],
  data: () => ({
    otpUppercase: ""
  }),
  methods: {
    uppercase() {
      this.otpUppercase = this.otp ? this.otp.toUpperCase() : "";
    }
  }
}
</script>