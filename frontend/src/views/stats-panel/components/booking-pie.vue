<template>
  <v-card class="mx-auto rounded-4" elevation="4">
    <v-card-item>
      <v-chart class="chart" :option="option" autoresize></v-chart>
    </v-card-item>
  </v-card>
</template>

<script>
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';

echarts.use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

export default {
  components: { VChart },
  data() {
    return {
      option: {
        title: {
          text: "Prenotazioni per campo",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/> {b} : {c} ({d}%)"
        },
        series: [
          {
            name: "Prenotazioni per campo",
            type: "pie",
            radius: "50%",
            center: ["50%", "60%"],
            data: [
              { value: 30, name: "Campo 1" },
              { value: 200, name: "Campo 2" },
              { value: 500, name: "Campo 3" },
              { value: 100, name: "Campo 4" },
              { value: 150, name: "Campo 5" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
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