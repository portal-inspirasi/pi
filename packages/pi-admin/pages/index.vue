<template>
  <v-layout justify-center row wrap>
    <!-- <v-parallax
      class="banner"
      src="https://lajollamom.com/wp-content/uploads/2016/01/how-to-save-money-on-rental-cars.jpg"
    ></v-parallax> -->
    <div class="banner"></div>
    <ListToBuyInputBox />
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ListToBuyInputBox from '~/components/ListToBuyInputBox.vue';

@Component({
  components: {
    ListToBuyInputBox
  }
})
export default class Home extends Vue {
  /* ------------------------------------
  => Local State Declaration
  ------------------------------------ */

  /* ------------------------------------
  => Setter and Getter
  ** (Adopt store variables to local state)
  ------------------------------------ */
  get languageSetting(): boolean {
    return this.$store.state.ui.languageSetting.homeContent;
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
