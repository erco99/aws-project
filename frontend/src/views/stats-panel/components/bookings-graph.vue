<template>
  <v-card class="mx-auto rounded-4" elevation="4">
    <v-card-item>
    <v-chart class="chart" :option="option" autoresize></v-chart>
    </v-card-item>
  </v-card>
</template>

<script>
import  * as echarts from "echarts/core"
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { GridComponent } from 'echarts/components';
import { TitleComponent, TooltipComponent, LegendComponent } from "echarts/components";
import VChart from "vue-echarts";
import { getYearDistribution } from "@/api/stats";

import PageNumber from "@/views/signup/components/commons/PageNumber.vue";

echarts.use([ CanvasRenderer, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent ])

export default {
  components: {PageNumber, VChart },
  data() {
    return {
      option: {
        title: {
          text: "Prenotazioni per mese",
          left: "center"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            rotate: 40
          },
          data: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
            {
              name: "Prenotazioni",
              type: 'line',
              smooth: true,
              lineStyle: {
                width: 0
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(197, 232, 183)'
                  },
                  {
                    offset: 0.2,
                    color: 'rgb(171, 224, 152)'
                  },
                  {
                    offset: 0.4,
                    color: 'rgb(131, 212, 117)'
                  },
                  {
                    offset: 0.6,
                    color: 'rgb(87, 200, 77)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(46, 182, 44)'
                  }
                ])
              },
              emphasis: {
                focus: 'series'
              },
              data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
          }
        ],
      }
    }
  },
  mounted() {
    getYearDistribution({ year: new Date().getFullYear() }).then((response) => {
      this.option.series[0].data = response.data;
    })
  }
}
</script>

<style scoped>
  .chart {
    height: 30vh;
  }
</style>

