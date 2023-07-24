<script>
import Field from "./components/Field.vue";
import DayPicker from "./components/DayPicker.vue";
import { getFields, getWeek } from "../../api/booking";
import io from "socket.io-client";
export default {
  mounted() {
    const weekPromise = getWeek({ day: this.day });
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
        this.socket.on("new-booking", (book) => {
          for (let i = 0; i < this.fields.length; i++) {
            if ((this.fields[i].name = book.field)) {
              this.fields[i].bookings.push(book);
            }
          }
        });
      });
    });
  },
  unmounted() {
    this.socket.disconnect();
  },
  data() {
    return {
      fields: [],
      day: null,
      socket: io("http://localhost:10000"),
    };
  },
  components: { Field, DayPicker },
};
</script>

<template>
  <div class="mx-auto">
    <DayPicker @day-update="(newDay) => (day = newDay)"></DayPicker>
    <v-sheet class="mx-auto mt-4" elevation="4">
      <div class="overflow-x-auto">
        <div class="p-2" v-for="field in fields" :key="field.name">
          <Field
            :name="field.name"
            :bookings="field.bookings"
            :closing="field.closing"
            :opening="field.opening"
            :minutes="field.minutes"
            :state="field.state"
            :surface="field.surface"
            :day="day.toISOString()" />
        </div>
      </div>
    </v-sheet>
  </div>
  <div style="height: 50px"></div>
</template>
