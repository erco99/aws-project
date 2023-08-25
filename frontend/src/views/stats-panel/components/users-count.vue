<template>
  <v-card class="card mx-auto rounded-4" elevation="4">
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
  GraphicComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import { getUsersDistribution } from "@/api/stats";

echarts.use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GraphicComponent,
]);
export default {
  components: { VChart },
  data() {
    return {
      option: {
        title: {
          text: "Numero di account registrati",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/> {b} : {c} ({d}%)"
        },
        graphic: {
          elements: [{
            type: "text",
            left: 'center',
            top: '42%',
            z: 999,
            style: {
              text: "0",
              textAlign: 'center',
              fontSize: 95,
              fontFamily: "BebasNeue",
            }
          }]
        },
        series: [
          {
            name: "Numero di account registrati",
            type: "pie",
            radius: [80, 110],
            center: ["50%", "58%"],
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
    getUsersDistribution().then(response => {
      const { usersDistribution } = response.data;
      let totalCount = 0;
      for (const userCount of usersDistribution) {
        totalCount = totalCount + userCount.value;
      }
      this.option.series[0].data = usersDistribution;
      this.option.graphic.elements[0].style.text = totalCount.toString();
      //console.log(usersCount.filter(count => count.key === "admin").shift().value)
      //this.adminCount = usersCount.filter(count => count.key === "admin").shift().value
      //this.standardCount = usersCount.filter(count => count.key === "standard").shift().value
    })
  }
}
</script>

<style>
  @font-face {
    font-family: "BebasNeue";
    src: local("BebasNeue"),
    url("./fonts/BebasNeue/BebasNeue-Regular.ttf") format("truetype");
  }
</style>

<style scoped>
.chart {
  height: 300px;
}
</style>