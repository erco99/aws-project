<script>
import Field from "./components/Field.vue";
import { getFields } from "../../api/booking";
export default {
  setup() {
    return { getFields };
  },
  mounted() {
    const fieldsFromDB = getFields();
    fieldsFromDB.then((result) => {
      let sorted = result.data;
      sorted.sort((a, b) => (a.name < b.name ? -1 : a.name == b.name ? 0 : 1));
      this.fields = sorted;
    });
  },
  data() {
    return {
      fields: [],
    };
  },
  components: { Field },
};
</script>

<template>
  <div class="overflow-x-auto">
    <div class="py-2" v-for="field in fields" :key="field.name">
      <Field v-bind="field" />
    </div>
  </div>
</template>
