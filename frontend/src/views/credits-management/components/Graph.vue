<template>
    <v-card class="mx-auto rounded-0" elevation="4">
      <v-card-item>
          <div class="text-overline mb-1">
            Grafico
          </div>
          <div>
            <v-chart class="chart" :option="option" autoresize></v-chart>
            {{ this.showTrans() }}
          </div>
      </v-card-item>
    </v-card>
</template>

<script>
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
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
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GraphicComponent,
]);

export default {
  components: { VChart },
  data () {
    return {
      monthMap: new Map([[1,'Gen'], [2,'Feb'], [3,'Mar'], [4,'Apr'], [5,'Mag'], [6,'Giu'],
                          [7,'Lug'], [8,'Ago'], [9,'Set'], [10,'Ott'], [11,'Nov'], [12,'Dic']]),
      prova: [],
      option : {
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      }
    }
  },
  mounted() {
    const d = new Date();
      let month = d.getMonth();
      for(let i = 1; i < month + 2; i++) {
        console.log( this.prova)
        this.option.xAxis.data.push(this.monthMap.get(i))
      }
  },
  methods: {
    showTrans() {
      this.prova = this.$store.getters.transactions
    }
  }

}
</script>

<style scoped>
.chart {
  height: 300px;
  display: flex;
}
</style>