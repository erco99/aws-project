<template>
  <v-card class="mx-auto rounded-0" elevation="4" height="292">
    <v-card-item>
      <div>
        <div class="text-overline mb-1">
          INFORMAZIONI SULL'ACCOUNT
        </div>
        <div class="informations pt-3">
          <v-table>
            <tbody>
              <tr
                v-for="item in this.getInfoMap()"
                :key="item[0]">
                <td style="font-weight: bold">{{ item[0] }}</td>
                <td style="font-style: italic">{{ item[1] }}</td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>

<script>
  export default {
    methods: {
      getInfoMap() {
        const map = new Map();
        map.set("Nome", this.$store.getters.userName);
        map.set("Cognome", this.$store.getters.userSurname);
        map.set("Email", this.$store.getters.userEmail);
        map.set("Numero di telefono", '+39 '.concat(this.$store.getters.userNumber));
        return map;
      }
    }
  }
</script>