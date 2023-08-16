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
import { getFieldDistribution } from "@/api/stats";

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
            data: [],
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
  },
  mounted() {
    getFieldDistribution({ year: new Date().getFullYear() }).then((response) => {
      const data = [...response.data];
      for (let i = 0; i < data.length; i++) {
        if (data[i].value === 0) {
          data.splice(i, 1)
        }
      }
      this.option.series[0].data = data;
    })
  }
}
</script>

<style scoped>
.chart {
  height: 30vh;
}
</style>