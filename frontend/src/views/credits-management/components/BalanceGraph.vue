<template>
    <v-card class="mx-auto rounded-0" elevation="4">
      <v-card-item>
          <div class="text-overline mb-1">
            Variazione bilancio annuale
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
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GraphicComponent
} from 'echarts/components';
import VChart from 'vue-echarts';

echarts.use([
  CanvasRenderer,
  BarChart,
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
      monthMap: new Map([[1,'Gen'], [2,'Feb'], [3,'Mar'], [4,'Apr'], [5,'Mag'], [6,'Giu'],
                          [7,'Lug'], [8,'Ago'], [9,'Set'], [10,'Ott'], [11,'Nov'], [12,'Dic']]),
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
            data: [],
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
      this.option.xAxis.data.push(this.monthMap.get(i))
    }

    const data = {
      fullname: this.$store.getters.userFullname,
      email: this.$store.getters.userEmail
    }

    getTransactions(data).then(response => {
      this.transactions = response.data
      const d = new Date();   
      let balance = 0
      let sorted_transactions = []
      
      // calculate the total balance at the begging of the year
      for(let i = 0; i < this.transactions.length; i++) {
        let year = this.transactions[i].date.split("/")[2]
        if(parseInt(year) < parseInt(d.getFullYear())) {
          if(this.transactions[i].transaction_type == "positive") {
            balance += this.transactions[i].amount
          } else {
            balance -= this.transactions[i].amount
          }
        } else {
            // create same array of transactions but minimilized and sorted by month
            sorted_transactions.push({
              month: this.transactions[i].date.split("/")[1],
              amount: this.transactions[i].amount,
              type: this.transactions[i].transaction_type
            })
        }
      }

      sorted_transactions = sorted_transactions.sort((a,b) => a.month - b.month)

      let balance_variations = []

      for(let i = 0; i < d.getMonth() + 1; i++) {
        for(let j = 0; j < sorted_transactions.length; j++) {
          if (sorted_transactions[j].month == i+1) {
            (sorted_transactions[j].type == 'positive') ?
            (balance += sorted_transactions[j].amount) :
            (balance -= sorted_transactions[j].amount)
          }
        }
        balance_variations.push(balance)
      }
      this.option.series[0].data = balance_variations
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