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
        for (let j = 0; j < fields.length; j++) {
          fields[j].bookings = [];
        }
        for (let i = 0; i < week.length; i++) {
          for (let j = 0; j < fields.length; j++) {
            if (week[i].field == fields[j].name) {
              fields[j].bookings.push({
                day: week[i].day,
                bookings: week[i].bookings,
              });
            }
          }
        }
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
      <Field
        :name="field.name"
        :bookings="field.bookings"
        :closing="field.closing"
        :opening="field.opening"
        :minutes="field.minutes"
        :state="field.state"
        :surface="field.surface"
        :day="new Date('2023-07-18').toISOString()" />
    </div>
  </div>
</template>
