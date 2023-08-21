<template>
    <v-card class="mx-auto rounded-0" elevation="4">
      <v-card-item>
          <div class="text-overline mb-1">
            Transazioni
          </div>
          <v-data-table 
            :headers="headers"
            :items="transactions">
            <template v-slot:item="i">
              <tr>
                <td>{{ i.item.selectable.date }}</td>
                <td>{{ i.item.selectable.description }}</td>
                <td v-bind:style="[i.item.selectable.transaction_type == 'positive' ? {fontWeight: 900, color: 'green'} : {fontWeight: 900, color: 'red'}]">
                  {{ getSign(i.item.selectable.transaction_type) + i.item.selectable.amount }}
                </td>
              </tr>
            </template>
          </v-data-table>
      </v-card-item>
    </v-card>
</template>

<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import io from "socket.io-client";

export default {
  components: {
    VDataTable,
  },
  data: function() {
     return {
      headers: [
          { title: 'Data', align: 'start', key: 'date', width: '100px' },
          { title: 'Descrizione', align: 'start', key: 'description', sortable: false,},
          { title: 'Importo', align: 'start', key: 'amount', class: "blue lighten-5", sortable: false,}
        ],
      transactions: [],
      sign: '',
      socket: io("http://localhost:10000"),
     }
  },
  mounted: function() {
    const data = {
      fullname: this.$store.getters.userFullname,
      email: this.$store.getters.userEmail
    }
    this.$store.dispatch('transactions/getTransactions', data).then(() => {
      this.transactions = this.$store.getters.transactions;
    })
    this.socket.on("new-transaction", (transactionData) => {
      const { user } = transactionData;
      if (user.email === this.$store.getters.userEmail) {
        this.$store.commit("transactions/ADD_TRANSACTION", transactionData)
        this.transactions = this.$store.getters.transactions;
      }
    });
  },
  unmounted() {
    this.socket.disconnect();
  },
  methods: {
    getSign(value) {
      if(value==='positive') {
        return '+ '
      } else {
        return '- '
      }
    }
  }
}
</script>