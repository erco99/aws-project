<template>
  <v-card class="mx-auto rounded-0" elevation="4">
    <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
    />
  </v-card>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [{
          label: "Prenotazioni",
          backgroundColor: '#467a3b',
          data: [40, 20, 12] } ]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>

