<script>
import Field from "./components/Field.vue";
import { getFields, getWeek } from "../../api/booking";
export default {
  mounted() {
    const weekPromise = getWeek({ day: "2023-07-18" });
    weekPromise.then((weekResponse) => {
      const fieldsPromis = getFields();
      fieldsPromis.then((fieldsResponse) => {
        let fields = fieldsResponse.data;
        let week = weekResponse.data;
        for (let i = 0; i < week.length; i++) {
          for (let j = 0; j < fields.length; j++) {
            if (week[i].field == fields[j].name) {
              if (!fields[j].hasOwnProperty("bookings")) {
                fields[j].bookings = [];
              }
              // Aggiungere i giorni
              fields[j].bookings.push(...week[i].bookings);
            }
          }
        }
        fields.sort((a, b) =>
          a.name < b.name ? -1 : a.name == b.name ? 0 : 1
        );
        this.fields = fields;
      });
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
