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

          <v-fade-transition>
            <v-alert closable compact :text="alert.text" variant="tonal" color="success" v-model="alert.visible"></v-alert>
          </v-fade-transition>

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
                   @click="this.$router.push('/login')" :disabled="disableBack">
              Indietro
            </v-btn>
            <v-btn rounded="xl" variant="tonal" size="large" class="ma-4" append-icon="mdi-chevron-right"
                   @click="submit" :loading="loading" :disabled="disableReset">
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
import {useStore} from "vuex";
import {ref} from "vue";
import {useRouter} from "vue-router";

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

      const alert = ref({visible: false, text: ""});
      const loading = ref(false)
      const disableBack = ref(false)
      const disableReset = ref(false)

      // Default values for debug
      email.value.value = "enrico.lumini@studio.unibo.it"

      const store = useStore()
      const router = useRouter()
      const submit = handleSubmit((formData) => {
        alert.value.visible = false
        loading.value = true
        disableBack.value = true
        store.dispatch('user/resetPassword', { email: formData.email }).finally(() => {
          loading.value = false
          disableBack.value = true
          disableReset.value = true
          alert.value.visible = true
          alert.value.text = "Email inviata, resetta la tua password utilizzando il link al suo interno." +
              "Verrai reindirizzato alla pagina di login tra 5 secondi"
          // TODO: Redirect to login?
          setTimeout(() => {router.push('/login')}, 5000);
        })
      })

      return {email, submit, alert, loading, disableBack, disableReset}
    }

  }
</script>