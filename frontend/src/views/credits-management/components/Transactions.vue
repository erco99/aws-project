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
                v-for="item in desserts"
                :key="item.name"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
                <td>{{ item.importo }}</td>
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
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            importo: 43
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
      }
  },
  mounted: function() {
    const data = {
      fullname: this.$store.getters.userFullname,
      email: this.$store.getters.userEmail
    }
    console.log(data)
    this.$store.dispatch('transactions/getTransactions', data)
    console.log(this.$store.getters.getTransactions)
  }
}
</script>