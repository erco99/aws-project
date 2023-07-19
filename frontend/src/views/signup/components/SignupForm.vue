<template>

  <v-card-text>
    <v-form @submit.prevent="signup">

      <div class="text-center text-medium-emphasis text-subtitle-1 font-weight-bold pb-10">ASD Forum Tennis</div>

      <FullNameField v-model:full_name="full_name.value.value" v-model:error="full_name.errorMessage.value"></FullNameField>

    </v-form>
  </v-card-text>
</template>

<script>
  import FullNameField from "@/views/signup/components/fields/FullNameField.vue";
  import {useField, useForm} from "vee-validate";
  export default {
    components: {
      FullNameField
    },
    setup() {
      const {handleSubmit, handleReset} = useForm({
        validationSchema: {
          full_name (value) {
              if (/[a-zA-Z]+\s+[a-zA-Z]+$/i.test(value)) return true
              return "Il nome ed il cognome devono essere validi"
          }
        }
      })
      const full_name = useField('full_name')

      const signup = handleSubmit((values) => {
        console.log(values);
      })

      return {full_name, signup}
    }
  }
</script>

