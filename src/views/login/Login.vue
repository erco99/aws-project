<script setup>
import {ref} from 'vue'
import {useField, useForm} from 'vee-validate'

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
const stayConnected = useField('checkbox')
stayConnected.value.value = false

const submit = handleSubmit(values => {
  console.log(JSON.stringify(values, null, 2))
})
</script>

<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col>
        <v-card
            class="mx-auto pa-5 pb-0"
            elevation="1"
            rounded="lg"
            width="400px"
            min-width="400px"
            max-width="400px"
        >
          <v-card-text>
            <v-form @submit.prevent="submit">

              <div class="text-center text-medium-emphasis text-subtitle-1 font-weight-bold">ASD Forum Tennis</div>

              <v-text-field
                  class="pt-12"
                  v-model="email.value.value"
                  :error-messages="email.errorMessage.value"
                  density="compact"
                  placeholder="Email"
                  prepend-inner-icon="mdi-email-outline"
                  variant="solo"
                  rounded="xl"
              ></v-text-field>

              <v-text-field
                  v-model="password.value.value"
                  :error-messages="password.errorMessage.value"
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="visible ? 'text' : 'password'"
                  density="compact"
                  placeholder="Password"
                  prepend-inner-icon="mdi-lock-outline"
                  @click:append-inner="visible = !visible"
                  variant="solo"
                  rounded="xl"
              ></v-text-field>

              <v-checkbox
                  class="pt-n10"
                  v-model="stayConnected.value.value"
                  type="checkbox"
                  label="Resta connesso"
              ></v-checkbox>

              <a
                  class="text-caption text-decoration-none text-blue pl-3"
                  href="#"
                  rel="noopener noreferrer"
                  target="_blank">Password dimenticata?</a>

              <v-col class="text-center pt-16" cols="12">
                <v-btn type="submit" rounded="xl" variant="tonal" size="large">
                  Login
                </v-btn>
              </v-col>

              <v-card-text class="text-center">
                <span class="text-medium-emphasis text-subtitle-2">
                Non sei iscritto?
                <a
                  class="text-blue text-decoration-none"
                  href="#"
                  rel="noopener noreferrer"
                  target="_blank"
                  >Iscriviti <v-icon icon="mdi-chevron-right"></v-icon></a></span>
              </v-card-text>

            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    visible: false,
  }),
}
</script>

<style>

#app {
  height: 100vh;
}

</style>