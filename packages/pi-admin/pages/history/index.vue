<template>
  <v-layout justify-center row wrap>
    <div class="banner"></div>
    <ListHistory :history-data="historyData" />
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ListHistory from '~/components/ListHistory.vue';

@Component({
  components: {
    ListHistory
  }
})
export default class History extends Vue {
  /* ------------------------------------
  => Local State Declaration
  ------------------------------------ */

  /* ------------------------------------
  => Mounted (Lifecycle)
  ------------------------------------ */
  // mounted(): void {
  //   console.warn('test', this.historyData);
  //   console.warn('type of', typeof this.historyData[0].id);
  //   // console.warn('type of', typeof this.historyData[0].toIsoString());
  // }

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
.banner {
  // background-image: url(https://picsum.photos/1920/1080?random)
  background-image: url(https://as1.ftcdn.net/jpg/02/05/42/88/500_F_205428815_0IpiDDuS65FMqnLbigzoXmjUUDpDhZVX.jpg)
  background-repeat: repeat;
  background-size: 10%;
  opacity: 0.3;
  width: 100%
  top: 0;
  bottom: 0;
  position: absolute;
}
.slider-content {
  overflow: auto;
  .slider-item {
    min-width: 400px;
    >>> .v-card__subtitle {
      min-height: 75px;
    }
  }
}
</style>
