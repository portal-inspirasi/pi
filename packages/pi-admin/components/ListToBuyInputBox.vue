<template>
  <v-flex xs12 sm8 md6>
    <v-card class="main-box">
      <v-card-text>
        <h1 class="primary--text mb-5">Penghitungan Material</h1>
        <v-form ref="inputForm" v-model="valid" lazy-validation>
          <v-layout v-for="(inputRow, i) in itemList" :key="i" row>
            <v-flex xl8 md8 xs12>
              <v-autocomplete
                v-model="inputRow.product"
                class="mx-2"
                :label="`Produk ${i + 1}`"
                item-text="name"
                :items="productItemList"
                return-object
                aria-autocomplete="off"
                hint="Produk yang ingin dihitung komposisi materialnya"
                :rules="productRules"
                outlined
                clearable
              ></v-autocomplete>
            </v-flex>
            <v-flex xl3 md3 xs12>
              <v-text-field
                v-model="inputRow.quantity"
                class="mx-2"
                label="Kuantitas"
                hint="Jumlah kuantiti"
                type="number"
                aria-autocomplete="off"
                :rules="amountRules"
                outlined
                clearable
              ></v-text-field>
            </v-flex>
            <v-flex xl1 md1 xs12>
              <v-btn
                v-if="i === itemList.length - 1"
                icon
                color="primary"
                class="ma-2"
                @click="addItem"
              >
                <v-icon>mdi-plus-thick</v-icon>
              </v-btn>
              <v-btn
                v-else
                icon
                color="primary"
                class="ma-2"
                @click="deleteItem(i)"
              >
                <v-icon>mdi-delete-forever</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          class="transform-none book-button"
          color="primary"
          nuxt
          :disabled="!valid"
          @click="calculate"
        >
          Hitung!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { TableHeader, VForm } from '~/@types';

@Component
export default class ListToBuyInputBox extends Vue {
  /* ------------------------------------
  => Local State Declaration
  ------------------------------------ */
  valid: boolean = false;
  headers: TableHeader[] = [
    {
      text: 'Nama Produk',
      align: 'start',
      value: 'product.name',
      class: 'table-header'
    },
    { text: 'Kuantitas', value: 'quantity', class: 'table-header' }
  ];

  itemList: any = [
    {
      product: {
        id: 0,
        name: '',
        unit: 'pcs'
      },
      quantity: null
    }
  ];

  productRules: any[] = [
    (v: any): boolean | string => (!!v && v.id !== 0) || `Produk harus diisi`
  ];

  amountRules: any[] = [
    (v: string | number): boolean | string => !!v || `Kuantitas harus diisi`,
    (v: string): boolean | string =>
      (v && parseFloat(v) > 0) || `Kuantitas tidak valid`
  ];

  /* ------------------------------------
  => Methods
  ------------------------------------ */
  addItem(): void {
    this.itemList.push({
      product: {
        id: 0,
        name: '',
        unit: 'pcs'
      },
      quantity: null
    });
  }

  deleteItem(index: number): void {
    this.itemList.splice(index, 1);
  }

  calculate(): void {
    const form = this.$refs.inputForm as VForm;
    if (form.validate()) {
      this.doCalculate();
    }
  }

  doCalculate(): void {
    // Part 1
    let listOfUniqueMaterial: any = [];
    const totalComposedMaterial: any = [];
    let description: string = '';
    const calculatedMaterials = this.itemList.map((item: any) => {
      description = description + `${item.product.name}(${item.quantity}), `;
      const theCombination = this.listCombination.find((combination: any) => {
        return combination.id === item.product.id;
      });
      const composed = theCombination.materials.map((material: any) => {
        const selectedMaterial = this.listMaterial.find(
          (materialObject: any) => {
            return materialObject.id === material.id;
          }
        );
        return {
          ...selectedMaterial,
          quantity: parseInt(item.quantity),
          totalQuantity: parseInt(item.quantity) * material.amount
        };
      });
      const dataRow: any = {};
      composed.forEach((element: any) => {
        totalComposedMaterial.push(element);
        dataRow[`${element.name.replace(/\s/g, '').toLowerCase()}`] =
          element.totalQuantity;
      });
      const fullObject = {
        product: {
          id: item.product.id,
          name: item.product.name,
          unit: item.product.unit
        },
        quantity: parseInt(item.quantity),
        composed,
        dataRow
      };
      return fullObject;
    });
    listOfUniqueMaterial = totalComposedMaterial.filter(
      (v: any, i: any, a: any) => a.findIndex((t: any) => t.id === v.id) === i
    );
    // Part 2
    const result = listOfUniqueMaterial.map((material: any) => {
      let totalQuantityAmmount = 0;
      totalComposedMaterial.forEach((element: any) => {
        if (element.id === material.id) {
          totalQuantityAmmount = totalQuantityAmmount + element.totalQuantity;
        }
      });
      return {
        material,
        totalQuantityAmmount
      };
    });
    // Part 3
    const finalResult = result.map((resultEntity: any) => {
      return {
        material: {
          id: resultEntity.material.id,
          name: resultEntity.material.name
        },
        quantityBeforeAddition: resultEntity.totalQuantityAmmount,
        finalQuantity:
          resultEntity.totalQuantityAmmount +
          (resultEntity.totalQuantityAmmount *
            this.$store.state.setting.percentage) /
            100
      };
    });
    // Part 4
    const wholeDataCalculated = {
      id: new Date().toISOString(),
      calculatedMaterials,
      listOfUniqueMaterial,
      result,
      finalResult,
      description,
      additionPercentage: `${this.$store.state.setting.percentage}%`
    };
    this.$store
      .dispatch('calculation/saveToHistory', wholeDataCalculated)
      .then(() => {
        this.$router.push(`/history/${wholeDataCalculated.id}`);
      });

    console.warn('result', result);
    console.warn('finalResult', finalResult);
    console.warn('calculatedMaterials', calculatedMaterials);
    console.warn('listOfUniqueMaterial', listOfUniqueMaterial);
    console.warn('totalComposedMaterial', totalComposedMaterial);
  }

  /* ------------------------------------
  => Setter and Getter
  ** (Adopt store variables to local state)
  ------------------------------------ */
  get languageSetting(): boolean {
    return this.$store.state.ui.languageSetting.tripBox;
  }

  get productItemList(): any {
    return this.$store.state.product.listProduct;
  }

  get listCombination(): any {
    return this.$store.state.combination.listCombination;
  }

  get listMaterial(): any {
    return this.$store.state.material.listMaterial;
  }
}
</script>
<style lang="stylus" scoped>
.transform-none {
  text-transform: none;
  letter-spacing: inherit;
}
.main-box {
  margin: 100px 0 100px 0;
  padding: 10px;
  opacity: 0.80;
  .v-card__text {
    padding-bottom: 0;
  }
  >>> .coupon-revealer {
    text-align: right;
    display: block;
    .coupon-activator:hover {
      color: red;
      opacity: 0.6;
      transition: 0.3s;
      cursor: pointer;
    }
  }
}
.book-button {
  width: 100%;
}
</style>
