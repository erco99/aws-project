<template>
    <v-card class="mx-auto rounded-0" elevation="4">
      <v-card-item>
          <div class="text-overline mb-1">
            Transazioni
          </div>
            <v-table>
            <thead>
              <tr>
                <th class="text-left">
                  Data
                </th>
                <th class="text-left">
                  Descrizione
                </th>
                <th class="text-left">
                  Importo
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in this.$store.getters.transactions "
                :key="item.user"
              >
                <td>{{ item.date }}</td>
                <td>{{ item.description }}</td>
                <td v-bind:style="[item.transaction_type == 'positive' ? {fontWeight: 900, color: 'green'} : {fontWeight: 900, color: 'red'}]">
                  {{ getSign(item.transaction_type) + item.amount }}
                </td>
              </tr>
            </tbody>
            </v-table>
      </v-card-item>
    </v-card>
</template>

<script>
export default {
  data: () => {
     return {
        transactions: [],
        sign: '',
      }
  },
  mounted: function() {
    const data = {
      fullname: this.$store.getters.userFullname,
      email: this.$store.getters.userEmail
    }
    this.$store.dispatch('transactions/getTransactions', data)

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