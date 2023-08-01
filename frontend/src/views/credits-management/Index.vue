<template>
  <v-row>
    <v-col sm="12" md="6" class="align-self-baseline">
      <balance />
      <transactions style="margin-top: 15px;"/>
    </v-col>

    <v-col sm="12" md="6" class="align-self-baseline">
      <pay-method />
    </v-col>
    
  </v-row>
</template>


<script>
import Balance from "./components/Balance.vue"
import Transactions from "./components/Transactions.vue"
import PayMethod from "./components/PayMethod.vue"

export default {
  name: "Credits",
  components: {
    Balance,
    Transactions,
    PayMethod
  }

}
</script>

<style>
.v-col > div {
  text-align: initial;
}
</style>
