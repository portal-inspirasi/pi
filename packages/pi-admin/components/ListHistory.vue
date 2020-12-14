<template>
  <v-flex xs12 sm8 md6>
    <v-card v-if="historyData.length === 0" class="main-box">
      <v-card-text>
        <h3 class="primary--text mb-3 text-center">
          Untuk saat ini Riwayat Kalkulasi masih kosong <br />
          <v-icon size="60" color="primary" class="ma-5"
            >mdi-select-search</v-icon
          >
        </h3>
        <h5 class="mb-3 text-center">
          <v-btn
            color="primary"
            class="transform-none"
            @click="$router.push('/')"
            >Mulai menghitung! Klik!</v-btn
          >
        </h5></v-card-text
      >
    </v-card>
    <v-card v-else class="main-box">
      <v-card-text>
        <v-layout row>
          <v-flex
            ><h1 class="primary--text mb-3">Riwayat Penghitungan</h1></v-flex
          >
          <v-flex class="align-end"
            ><v-btn
              small
              outlined
              color="primary"
              class="transform-none"
              @click="clearHistory"
            >
              <v-icon left size="12">mdi-delete-forever</v-icon>Hapus
              Riwayat</v-btn
            ></v-flex
          >
        </v-layout>
        <v-layout row>
          <v-flex xl12 md12 xs12>
            <v-card
              v-for="(item, index) in historyData"
              :key="index"
              class="mx-auto my-2"
              outlined
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">{{ dateFormatter(item.id) }}</div>
                  <v-list-item-title class="headline mb-1">
                    {{ timeFormatter(item.id) }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{
                    item.description
                  }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="80">
                  <v-btn
                    icon
                    color="primary"
                    class="ma-2"
                    @click="redirectTo(item.id)"
                  >
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn></v-list-item-avatar
                >
              </v-list-item>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { timeFormatter, dateFormatter } from '~/@utils';

@Component
export default class TripInputBox extends Vue {
  /* ------------------------------------
  => Local State Declaration
  ------------------------------------ */
  // historyTime: string = timeFormatter(this.item.id);
  // historyDate: string = dateFormatter(this.item.id);

  /* ------------------------------------
  => Props declaration
  ------------------------------------ */
  @Prop({ required: true, type: Array })
  readonly historyData!: any[];

  /* ------------------------------------
  => Setter and Getter
  ** (Adopt store variables to local state)
  ------------------------------------ */
  get languageSetting(): boolean {
    return this.$store.state.ui.languageSetting.tripBox;
  }

  /* ------------------------------------
  => Methods
  ------------------------------------ */
  dateFormatter(date: Date): string {
    return dateFormatter(date);
  }

  timeFormatter(date: Date): string {
    return timeFormatter(date);
  }

  redirectTo(id: string): void {
    this.$router.push(`/history/${id}`);
  }

  clearHistory(): void {
    this.$store.dispatch('calculation/clearHistory');
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
.align-end {
  text-align: right;
}
</style>
