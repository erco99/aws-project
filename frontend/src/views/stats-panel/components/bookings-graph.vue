<template>
  <v-card class="mx-auto rounded-0" elevation="4">
    <v-chart class="chart" :option="option" autoresize></v-chart>
  </v-card>
</template>

<script>
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { GridComponent } from 'echarts/components';
import { TitleComponent, TooltipComponent, LegendComponent } from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { provide } from "vue";
import PageNumber from "@/views/signup/components/commons/PageNumber.vue";

use([ CanvasRenderer, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent ])

export default {
  components: {PageNumber, VChart },
  data() {
    return {
      option: {
        title: {
          text: "Prenotazioni per mese",
          left: "center"
        },
        xAxis: {
          type: 'category',
          data: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
            {
              type: 'line',
              data: [ 20, 30, 70, 10],
          }
        ],
        emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            }
        }
      }
    }
  }
}
</script>

<style scoped>
  .chart {
    height: 30vh;
  }
</style>

