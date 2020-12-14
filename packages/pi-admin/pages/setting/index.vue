<template>
  <v-layout column>
    <v-flex ma-2>
      <v-layout wrap>
        <v-flex xs9 mt-3 mb-3>
          <h2 class="primary--text">Pengaturan Rasio Penambahan</h2>
        </v-flex>
        <v-flex xs3 mt-3 mb-3 class="text-right">
          <v-layout row class="ma-2 primary--text">
            <v-flex>
              <v-chip color="primary" outlined>
                Nilai setelan saat ini adalah {{ percentage }}%
              </v-chip>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex ma-2>
      <v-slider
        v-model="percentage"
        hint="Rasio untuk penambahan material pada kalkulasi akhir"
        max="100"
        min="0"
        persistent-hint
        thumb-label
      ></v-slider>
    </v-flex>
    <v-flex ma-2>
      <v-layout wrap>
        <v-flex xs8 mt-3 mb-3>
          <h2 class="primary--text">Pengaturan Komposisi Master Material</h2>
        </v-flex>
        <v-flex xs4 mt-3 mb-3 class="text-right">
          <v-layout row class="mx-2">
            <v-flex class="pa-2">
              <v-btn
                rounded
                color="primary"
                class="transform-none"
                href="/sample_master_file.xlsx"
                download=""
                outlined
              >
                <v-icon left>mdi-cloud-download</v-icon>Download Sampel
              </v-btn>
            </v-flex>
            <v-flex class="pa-2">
              <v-btn
                color="primary"
                class="transform-none"
                rounded
                outlined
                :loading="isSelecting"
                @click="onButtonClick"
              >
                <v-icon left> mdi-cloud-upload </v-icon>
                Upload
              </v-btn>
              <input
                ref="uploader"
                class="d-none"
                type="file"
                @change="onFileChanged"
              />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex ma-2>
      <v-data-table class="elevation-1" :headers="headers" :items="items">
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import XLSX from 'xlsx';

@Component
export default class SettingPage extends Vue {
  /* ------------------------------------
  => Local State Declaration
  ------------------------------------ */
  selectedFile: any = null;
  isSelecting: any = false;

  /* ------------------------------------
  => Methods
  ------------------------------------ */
  previewFiles(e: any): void {
    const files = e.target.files;
    const f = files[0];
    const reader = new FileReader();
    reader.onload = async (ee) => {
      const target: any = ee.target;
      const data = new Uint8Array(target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      /* DO SOMETHING WITH workbook HERE */
      const worksheet = workbook.Sheets[sheetName];
      const headers = await this.getHeader(worksheet);
      const items = await XLSX.utils.sheet_to_json(worksheet);
      await this.$store.dispatch('setting/updateTable', {
        headers,
        items
      });
      const products = await this.createProducts(this.items);
      const materials = await this.createMaterials(headers);
      this.createCombinations(this.items, products, materials);
      console.warn('workbook', workbook);
      console.warn('json', XLSX.utils.sheet_to_json(worksheet));
      console.warn('header', headers);
      console.warn('items', items);
    };
    reader.readAsArrayBuffer(f);
  }

  onButtonClick(): void {
    this.isSelecting = true;
    window.addEventListener(
      'focus',
      () => {
        this.isSelecting = false;
      },
      { once: true }
    );
    const uploader: any = this.$refs.uploader;
    uploader.click();
  }

  onFileChanged(e: any): void {
    this.selectedFile = e.target.files[0];
    // console.warn('selectedFile', this.selectedFile);
    this.previewFiles(e);

    // do something
  }

  getHeader(sheet: any): any {
    const headers = [];
    const range = XLSX.utils.decode_range(sheet['!ref']);
    let C = range.s.r; /* start in the first row */
    const R = range.s.r;
    /* walk every column in the range */
    for (C = range.s.c; C <= range.e.c; ++C) {
      const cell =
        sheet[
          XLSX.utils.encode_cell({ c: C, r: R })
        ]; /* find the cell in the first row */

      let hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
      if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);

      headers.push(hdr);
    }
    const tempHeaders = headers.map((value: string) => {
      return {
        text: value,
        value
      };
    });
    return tempHeaders;
  }

  async createProducts(items: any): Promise<any> {
    const products = await items.map((item: any, index: number) => {
      return {
        id: index + 1,
        name: item.name,
        unit: 'pcs'
      };
    });
    console.warn('created products', products);
    await this.$store.dispatch('product/updateListProduct', products);
    return products;
  }

  async createMaterials(items: any): Promise<any> {
    const materials = await items.reduce(
      (result: any, item: any, index: number) => {
        if (index !== 0) {
          result.push({
            id: index,
            name: item.value,
            unit: ''
          });
        }
        return result;
      },
      []
    );
    console.warn('created materials', materials);
    await this.$store.dispatch('material/updateListMaterial', materials);
    return materials;
  }

  async createCombinations(
    items: any,
    products: any,
    materials: any
  ): Promise<any> {
    console.warn('createCombinations | products', products);
    console.warn('createCombinations | materials', materials);
    const combinations = await items.map((item: any) => {
      const product = products.find((product: any) => {
        return product.name === item.name;
      });
      const materialsCluster = Object.keys(item).reduce(
        (result: any, key: string) => {
          // console.warn(item);
          if (key !== 'name') {
            const tempMaterials = materials.find((material: any) => {
              return material.name === key;
            });
            result.push({
              amount: item[key],
              ...tempMaterials
            });
          }
          return result;
        },
        []
      );
      return {
        id: product.id,
        materials: materialsCluster
      };
    });
    console.warn('combinations', combinations);
    await this.$store.dispatch(
      'combination/updateListCombination',
      combinations
    );
    return combinations;
  }

  // onDownload(): void {
  //   console.warn('Downloading!');
  //   const test = XLSX.utils.json_to_sheet(this.items, {
  //     header: this.plainHeader
  //   });
  //   XLSX.writeFile(test, 'test.xlsx');
  //   console.warn('Created file', test);
  // }

  /* ------------------------------------
  => Setter and Getter
  ** (Adopt store variables to local state)
  ------------------------------------ */
  get headers(): any[] {
    return this.$store.state.setting.headers;
  }

  get items(): any[] {
    return this.$store.state.setting.items;
  }

  get percentage(): number {
    return this.$store.state.setting.percentage;
  }

  set percentage(value: number) {
    this.$store.dispatch('setting/changePercentage', value);
  }
}
</script>

<style lang="stylus" scoped>
.v-data-table >>> .table-header {
  background-color: var(--v-primary-base);
}
.transform-none {
  text-transform: none;
  letter-spacing: inherit;
}
</style>
