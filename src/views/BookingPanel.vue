<script setup>
import Field from "../components/Field.vue";
</script>

<script>
export default {
  data() {
    return {
      fields: [
        {
          name: "Campo 1",
        },
        {
          name: "Campo 2",
        },
        {
          name: "Campo 3",
        },
        {
          name: "Campo 4",
        },
        {
          name: "Campo 5",
        },
        {
          name: "Campo 6",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="container-fluid overflow-x-auto">
    <div class="py-2" v-for="field in fields">
      <Field v-bind="field" />
    </div>
  </div>
</template>
