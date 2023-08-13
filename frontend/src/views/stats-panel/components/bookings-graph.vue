<template>
  <v-card class="mx-auto rounded-0" elevation="4">
    <Line
        :options="chartOptions"
        :data="chartData"
    />
  </v-card>
</template>

<script>
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend )

export default {
  components: { Line },
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
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>

