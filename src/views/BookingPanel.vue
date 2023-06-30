<script setup>
import Field from "./Field.vue";
</script>

<script>
export default {
  data() {
    return {
      fields: [
        "Campo 1",
        "Campo 2",
        "Campo 3",
        "Campo 4",
        "Campo 5",
        "Campo 6",
      ],
    };
  },
};
</script>

<template>
  <div class="container-fluid overflow-x-auto">
    <div class="py-2" v-for="field in fields">
      <h4>{{ field }}</h4>
      <Field />
    </div>
  </div>
</template>
