<script>
import { domainDate, getStringDay, getStringMonth, getDate } from "./commons";
import {
  wmoToIcon,
  getDayWmo,
} from "@/views/booking-panel/components/weather/utils";
export default {
  emits: ["dayUpdate"],
  setup() {
    return { wmoToIcon, getDayWmo, getStringDay, getStringMonth, getDate };
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
        days.push(domainDate(current));
        current.setUTCDate(current.getDate() + 1);
      } while (current.getDay() != 0);
      days.push(domainDate(current));
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
          height="105"
          width="105"
          @click="toggle">
          <div>
            <v-icon
              v-if="this.$store.getters.weatherDataReady"
              class="text-blue-grey-darken-2"
              :icon="wmoToIcon(getDayWmo(day))"></v-icon>
          </div>
          <div class="d-flex text-center align-center justify-center">
            <div>
              <div>{{ getStringDay(day) }}</div>
              <div>{{ getDate(day) }}</div>
              <div>{{ getStringMonth(day) }}</div>
            </div>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>
