<template>
  <v-card class="mx-auto rounded-0" elevation="4">
    <v-card-item>
      <div class="text-overline mb-1">
        Tipologie di transazioni
      </div>
        <div>
          <v-chart class="chart" :option="option" autoresize></v-chart>
        </div>
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

echarts.use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GraphicComponent,
]);

import { getTransactions } from "@/api/credits";

export default {
  components: { VChart },
  data () {
    return {
      transactions: [],
      transactions_type_map: new Map([]),
      option: {
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Tipo transazione',
            type: 'pie',
            radius: '60%',
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
      } 
    }
  },
  mounted() {
    const data = {
      fullname: this.$store.getters.userFullname,
      email: this.$store.getters.userEmail
    }

    getTransactions(data).then(response => {
      this.transactions = response.data
      
      for(let i = 0; i < this.transactions.length; i++) {
        let type = this.transactions[i].description.toLowerCase().split(" ")[0]
        this.transactions_type_map.set(type, (this.transactions_type_map.get(type) ?? 0) + 1)
      }

      let elements = []
      for (let [key, value] of this.transactions_type_map) {
        elements.push({value: value, name: key})
      }

      this.option.series[0].data = elements
    })
  }
}
</script>

<style scoped>
.chart {
  height: 300px;
  display: flex;
}
</style>