<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col>
        <v-card
            class="mx-auto pa-5"
            elevation="3"
            rounded="lg"
            width="400px"
            min-width="400px"
            max-width="400px"
        >
          <div class="text-center text-medium-emphasis text-h6 font-weight-bold pt-2 pb-2">
            Password dimenticata?
          </div>

          <div class="text-center text-caption text-subtitle-1 font-weight-bold pt-2">
            Perfavore inserisci il tuo indirizzo email. Riceverai un link per creare una nuova password
          </div>

          <v-text-field
              class="pt-4 pb-8"
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
              density="compact"
              placeholder="Email"
              prepend-inner-icon="mdi-email-outline"
              variant="solo"
              rounded="xl"
          ></v-text-field>

          <v-row align="center" justify="center">
            <v-btn rounded="xl" variant="tonal" size="large" class="ma-4" prepend-icon="mdi-chevron-left"
                   @click="this.$router.push('/login')">
              Indietro
            </v-btn>
            <v-btn rounded="xl" variant="tonal" size="large" class="ma-4" append-icon="mdi-chevron-right"
                   @click="submit">
              Continua
            </v-btn>
          </v-row>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {useField, useForm} from "vee-validate";

  export default {
    setup() {
      const {handleSubmit, handleReset} = useForm({
        validationSchema: {
          email(value) {
            if (/^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
            return 'L\'email deve essere valida.'
          },
        },
      })
      const email = useField("email")

      // Default values for debug
      email.value.value = "enrico.lumini@studio.unibo.it"

      const submit = handleSubmit((values) => {
        console.log("Request email sending")
      })

      return {email, submit}
    }

  }
</script>