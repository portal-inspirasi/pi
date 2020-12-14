<template>
  <v-footer padless class="transparance">
    <v-card flat tile width="100%" class="primary text-center">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        Applikasi Penghitung Jumlah Material © 2020
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class Footer extends Vue {
  /* ------------------------------------
  => Local State Declaration
  ------------------------------------ */
  icons: string[] = [
    'mdi-facebook',
    'mdi-twitter',
    'mdi-linkedin',
    'mdi-instagram'
  ];

  /* ------------------------------------
  => Setter and Getter
  ** (Adopt store variables to local state)
  ------------------------------------ */
  get languageSetting(): boolean {
    return this.$store.state.ui.languageSetting.footer;
  }
}
</script>
<style lang="stylus" scoped>
.transparance {
  opacity: 0.90;
}
.full-width {
  max-width: none;
}
.no-padding {
  padding: 0 !important;
}
.transform-none {
  text-transform: none;
  letter-spacing: inherit;
}
</style>
