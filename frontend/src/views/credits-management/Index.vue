<template>
  <v-row>
    <v-col cols="12" md="6" class="align-self-baseline">
      <balance />
      <transactions style="margin-top: 15px;"/>
    </v-col>

    <v-col cols="12" md="6" class="align-self-baseline">
      <pay-method />
      <balance-graph  style="margin-top: 15px;"/>
      <transactions-graph style="margin-top: 15px;" />
    </v-col>
  </v-row>
</template>


<script>
import Balance from "./components/Balance.vue"
import Transactions from "./components/Transactions.vue"
import PayMethod from "./components/PayMethod.vue"
import BalanceGraph from  "./components/BalanceGraph.vue"
import TransactionsGraph from "./components/TransactionsGraph.vue"

export default {
  name: "Credits",
  components: {
    Balance,
    Transactions,
    PayMethod,
    BalanceGraph,
    TransactionsGraph
  }

}
</script>

<style>
.v-col > div {
  text-align: initial;
}
</style>
