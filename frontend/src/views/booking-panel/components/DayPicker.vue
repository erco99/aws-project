<script>
import { dayToString, monthToString } from "./commons";
export default {
  emits: ["dayUpdate"],
  setup() {
    return { dayToString, monthToString };
  },
  data() {
    return {
      selected: 0,
    };
  },
  mounted() {
    this.notifyDayUpdate(this.selected);
  },
  computed: {
    weekDays() {
      let current = new Date();
      const days = [];
      do {
        days.push(new Date(current));
        current.setUTCDate(current.getDate() + 1);
      } while (current.getDay() != 0);
      days.push(current);
      return days;
    },
  },
  methods: {
    notifyDayUpdate(value) {
      this.$emit("dayUpdate", this.weekDays[value]);
    },
  },
};
</script>

<template>
  <v-sheet class="mx-auto d-flex justify-center" elevation="4">
    <v-slide-group
      mandatory
      @update:modelValue="notifyDayUpdate"
      class="pa-4"
      v-model="selected"
      show-arrows>
      <v-slide-group-item
        v-for="(day, index) in weekDays"
        :key="index"
        v-slot="{ isSelected, toggle, selectedClass }">
        <v-card
          :color="isSelected ? 'blue-lighten-3' : 'white'"
          border
          :class="['ma-4', selectedClass]"
          height="100"
          width="100"
          @click="toggle">
          <div
            class="d-flex fill-height text-center align-center justify-center">
            <div>
              <div>{{ dayToString[day.getDay()] }}</div>
              <div>{{ day.getDate() }}</div>
              <div>{{ monthToString[day.getMonth()] }}</div>
            </div>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>
