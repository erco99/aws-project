<template>
  <div class="container-stepper">
    <div class="register-stepper">
      <v-icon icon="mdi-numeric-1-circle" :color="step === 1 ? 'green-darken-3' : ''"></v-icon>
      <v-icon icon="mdi-numeric-2-circle" :color="step === 2 ? 'green-darken-3' : ''"></v-icon>
      <v-icon icon="mdi-numeric-3-circle" :color="step === 3 ? 'green-darken-3' : ''"></v-icon>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['step'],
    emit: ['update:step']
  }
</script>

<style>
  .container-stepper {
    width: 100%;
    text-align: center;
  }

  .register-stepper {
    display: inline-flex;
    justify-content: space-between;
    position: relative;
    width: 50%;
  }

  .register-stepper::before {
    z-index: 0;
    content: " ";
    display: block;
    position: absolute;
    height: 2px;
    right: 10px;
    top: calc(50% - 1px);
    background: #cecece;
    width: calc(100% - 20px);
  }
</style>