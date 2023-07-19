<script setup>
import Field from "./components/Field.vue";
</script>

<script>
export default {
  data() {
    return {
      fields: [
        {
          name: "Campo 1",
          opening: 8,
          closing: 22,
          minutes: 30,
        },
        {
          name: "Campo 2",
          opening: 8,
          closing: 22,
          minutes: 30,
          state: { inside: { name: "coperto", color: "default" } },
        },
        {
          name: "Campo 3",
          opening: 8,
          closing: 22,
          minutes: 30,
          state: { inside: { name: "coperto", color: "default" } },
        },
        {
          name: "Campo 4",
          opening: 8,
          closing: 20,
          minutes: 0,
        },
        {
          name: "Campo 5",
          opening: 8,
          closing: 22,
          minutes: 0,
        },
        {
          name: "Campo 6",
          opening: 8,
          closing: 22,
          minutes: 0,
          state: { wet: { name: "bagnato", color: "red" } },
        },
      ],
    };
  },
};
</script>

<template>
  <div class="overflow-x-auto">
    <div class="py-2" v-for="field in fields" :key="field.name">
      <Field v-bind="field" />
    </div>
  </div>
</template>
