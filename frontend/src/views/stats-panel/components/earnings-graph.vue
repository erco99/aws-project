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
  import { getEarningsStats } from "@/api/stats";

  echarts.use([ CanvasRenderer, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent ])
  export default {
    components: { VChart },
    data() {
      return {
        option: {
          color: ["#37a2ff", "#ff9e44", "#80ffa5"],
          title: {
            text: "Movimenti finanziari",
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
          legend: {
            data: ['Entrate', 'Uscite', 'Guadagno'],
            left: 'center',
            top: 30
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
              name: "Entrate",
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
                    color: 'rgb(55, 162, 255)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(116, 21, 219)'
                  }
                ])
              },
              emphasis: {
                focus: 'series'
              },
              data : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
            },
            {
              name: "Uscite",
              type: 'line',
              smooth: true,
              lineStyle: {
                width: 0
              },
              showSymbol: false,
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                  }
                ])
              },
              emphasis: {
                focus: 'series'
              },
              data : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
            },
            {
              name: "Guadagno",
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
                    color: 'rgb(128, 255, 165)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(1, 191, 236)'
                  }
                ])
              },
              emphasis: {
                focus: 'series'
              },
              data : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
            },
          ]
        }
      }
    },
    mounted() {
      getEarningsStats().then((response) => {
        this.option.series[0].data = response.data.positive;
        this.option.series[1].data = response.data.negative;
        this.option.series[2].data = response.data.earning;
      })
    }
  }
</script>

<style scoped>
  .chart {
    height: 300px;
  }
</style>