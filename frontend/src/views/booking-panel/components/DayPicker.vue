<script>
export default {
  data() {
    return {
      selected: 0,
      dayToString: [
        "Domenica",
        "Lunedì",
        "Martedì",
        "Mercoledì",
        "Giovedì",
        "Venerdì",
        "Sabato",
      ],
      monthToString: [
        "Gennaio",
        "Febbraio",
        "Marzo",
        "Aprile",
        "Maggio",
        "Giugno",
        "Luglio",
        "Agosto",
        "Settembre",
        "Ottobre",
        "Novembre",
        "Dicembre",
      ],
    };
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
};
</script>

<template>
  <v-sheet class="mx-auto" elevation="4" max-width="800">
    <v-slide-group
      @update:modelValue="(value) => console.log(value)"
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
