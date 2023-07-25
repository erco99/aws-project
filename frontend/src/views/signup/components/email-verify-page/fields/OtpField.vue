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
      :disabled="disabled"
      append-inner-icon="mdi-chevron-right"
      @click:append-inner="this.$emit('onVerify')"
  ></v-text-field>
</template>

<script>
export default {
  props: ['otp', 'error', 'disabled'],
  emit: ['update:otp', 'onVerify'],
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