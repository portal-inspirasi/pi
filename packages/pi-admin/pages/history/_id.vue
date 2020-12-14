<template>
  <v-container>
    <v-layout justify-center row wrap>
      <v-flex xs12 sm12 md12>
        <v-data-table
          class="elevation-1 mb-3"
          :headers="headers"
          :loading="loading"
          :items="selectedHistoryData.calculatedMaterials"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title class="primary--text"
                >List Penghitungan Produk</v-toolbar-title
              >
            </v-toolbar>
          </template>
          <template v-slot:[`item.product.name`]="{ item }">
            {{ item.product.name }} ({{ item.quantity }})
          </template>
        </v-data-table>
        <v-simple-table class="elevation-1 my-2">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title class="primary--text"
                >List Material yang Telah Dijumlahkan</v-toolbar-title
              >
            </v-toolbar>
          </template>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Nama Bahan Material</th>
                <th class="text-left">Jumlah Kuantitas</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in selectedHistoryData.result" :key="item.name">
                <td>{{ item.material.name }}</td>
                <td>{{ item.totalQuantityAmmount }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-simple-table class="elevation-1 my-2">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title class="primary--text"
                >List Material yang Telah Ditambahkan
                {{ selectedHistoryData.additionPercentage }}</v-toolbar-title
              >
            </v-toolbar>
          </template>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Nama Bahan Material</th>
                <th class="text-left">Jumlah Kuantitas</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in selectedHistoryData.finalResult"
                :key="item.name"
              >
                <td>{{ item.material.name }}</td>
                <td>{{ item.finalQuantity }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class Home extends Vue {
  /* ------------------------------------
  => Local State Declaration
  ------------------------------------ */
  loading: boolean = true;
  selectedHistoryData: any = {};
  headers: any[] = [
    {
      text: 'Nama Produk (Kuantitas)',
      align: 'start',
      value: 'product.name'
    }
  ];

  /* ------------------------------------
  => Mounted (Lifecycle)
  ------------------------------------ */
  async mounted(): Promise<void> {
    // console.warn('cek param', this.$route.params.id);
    this.selectedHistoryData = await this.historyData.find(
      (v: any) => v.id === this.$route.params.id
    );
    console.warn('cek selectedHistoryData', this.selectedHistoryData);
    this.selectedHistoryData.listOfUniqueMaterial.forEach((val: any) => {
      this.headers.push({
        text: val.name,
        value: `dataRow.${val.name.replace(/\s/g, '').toLowerCase()}`
      });
    });
    this.loading = false;
  }

  /* ------------------------------------
  => Setter and Getter
  ** (Adopt store variables to local state)
  ------------------------------------ */
  get historyData(): any {
    return this.$store.state.calculation.calculationHistories;
  }
}
</script>

<style lang="stylus" scoped>
.transform-none {
  text-transform: none;
  letter-spacing: inherit;
}
</style>
