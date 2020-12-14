<template>
  <v-layout column>
    <v-flex ma-2>
      <v-layout wrap>
        <v-flex xs9 mt-3 mb-3>
          <h2 class="primary--text">List Produk pada Master Komposisi</h2>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex ma-2>
      <v-data-table class="elevation-1" :headers="headers" :items="products">
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class SettingPage extends Vue {
  /* ------------------------------------
  => Local State Declaration
  ------------------------------------ */
  selectedFile: any = null;
  headers: any[] = [
    {
      text: 'Nama',
      align: 'start',
      value: 'name'
    }
  ];

  /* ------------------------------------
  => Setter and Getter
  ** (Adopt store variables to local state)
  ------------------------------------ */
  get products(): any[] {
    return this.$store.state.product.listProduct;
  }
}
</script>

<style lang="stylus" scoped>
.v-data-table >>> .table-header {
  background-color: var(--v-primary-base);
}
</style>
