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
            Resetta la password del tuo account
          </div>

          <div class="text-center text-caption text-subtitle-1 font-weight-bold pt-2 pb-5">
            Inserisci una nuova password per il tuo account
          </div>

          <v-fade-transition>
            <v-alert compact :text="alert.text" variant="tonal" :color="alert.type" v-model="alert.visible"></v-alert>
          </v-fade-transition>

          <v-text-field
              v-model="password.value.value"
              @input="$emit('update:password', $event.target.value)"
              :error-messages="password.errorMessage.value"
              :append-inner-icon="visible1 ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible1 ? 'text' : 'password'"
              density="compact"
              placeholder="Nuova password"
              prepend-inner-icon="mdi-lock-outline"
              @click:append-inner="visible1 = !visible1"
              variant="solo"
              rounded="xl"
          ></v-text-field>

          <v-text-field
              class="pb-8"
              v-model="confirmPassword.value.value"
              @input="$emit('update:password', $event.target.value)"
              :error-messages="confirmPassword.errorMessage.value"
              :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible2 ? 'text' : 'password'"
              density="compact"
              placeholder="Conferma password"
              prepend-inner-icon="mdi-lock-outline"
              @click:append-inner="visible2 = !visible2"
              variant="solo"
              rounded="xl"
          ></v-text-field>

          <v-row align="center" justify="center">
            <v-btn rounded="xl" variant="tonal" size="large" class="ma-4" append-icon="mdi-chevron-right"
                   @click="submit" :loading="loading" :disabled="disable">
              Resetta password
            </v-btn>
          </v-row>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {useField, useForm} from "vee-validate";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {ref} from "vue";

export default {
  data: () => ({
    visible1: false,
    visible2: false,
  }),
  setup() {
    const {handleSubmit, handleReset} = useForm({
       validationSchema: {
         password (value) {
           if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(value)) return true
           return 'La password deve essere di almeno 8 caratteri e contenere numeri, ' +
               'lettere minuscole e maiuscole ed almeno un carattere speciale'
         },
         confirmPassword (value) {
           if (value === password.value.value) return true
           return "Le password non coincidono"
         }
       }
    });

    const password = useField("password");
    const confirmPassword = useField("confirmPassword");
    const alert = ref({text: "", visible: false, type: "success"})
    const loading = ref(false)
    const disable = ref(false)

    const route = useRoute();
    const store = useStore();
    const submit = handleSubmit(values => {
      loading.value = true
      alert.value.visible = false
      store.dispatch('user/changePassword',
          {resetToken: route.query.resetToken, userId: route.query.userId, password: values.password})
          .then(() => {
            disable.value = true
            alert.value.text = "Password modificata con successo. Puoi chiudere questa scheda e rieseguire il login"
            alert.value.visible = true
            loading.value = false;
      }).catch(error => {
        loading.value = false;
        alert.value.type = "error"
        alert.value.visible = true;
        disable.value = true;
        if (error.response.data.code === "reset-token-expired") {
          alert.value.text = "Sessione scaduta. Chiudi questa scheda e riprova"
        } else {
          alert.value.text = "Impossibile modificare la password. Chiudi questa scheda e riprova"
        }
      })
    });

    return {submit, password, confirmPassword, alert, loading, disable}
  },
}
</script>