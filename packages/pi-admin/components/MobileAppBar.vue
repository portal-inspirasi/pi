<template>
  <v-bottom-navigation v-model="activeItem" app fixed grow color="primary">
    <v-btn id="home-mnav-btn">
      <span class="menu-title">{{ languageSetting.bottomHome }}</span>
      <v-icon>mdi-home-outline</v-icon>
    </v-btn>
    <v-menu top offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn id="menu-mnav-btn" dark v-bind="attrs" v-on="on">
          <span class="menu-title">{{ languageSetting.bottomMenu }}</span>
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, index) in menuItems" :key="index">
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu
      v-model="menuSetting"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          id="setting-mnav-btn"
          depressed
          small
          fab
          class="transform-none"
          v-bind="attrs"
          v-on="on"
        >
          <span class="menu-title">{{ languageSetting.bottomSetting }}</span>
          <v-icon>mdi-web</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon>mdi-web</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{
                languageSetting.selectLang
              }}</v-list-item-title>
              <v-list-item-subtitle>{{
                languageSetting.comingLang
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item
            id="language-en-mnav-btn"
            link
            @click="switchLanguage('EN')"
          >
            <v-list-item-title
              v-text="languageSetting.english"
            ></v-list-item-title>
          </v-list-item>
          <v-list-item
            id="language-id-mnav-btn"
            link
            @click="switchLanguage('ID')"
          >
            <v-list-item-title
              v-text="languageSetting.bahasa"
            ></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <v-menu
      v-model="menuAccount"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          id="account-mnav-btn"
          depressed
          small
          fab
          class="transform-none"
          v-bind="attrs"
          v-on="on"
        >
          <span class="menu-title">{{ languageSetting.bottomAccount }}</span>
          <v-icon>mdi-account-outline</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Mae</v-list-item-title>
              <v-list-item-subtitle>Travel Addict</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="message"></v-switch>
            </v-list-item-action>
            <v-list-item-title>{{
              languageSetting.bottomMessages
            }}</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="hints"></v-switch>
            </v-list-item-action>
            <v-list-item-title>{{
              languageSetting.bottomHint
            }}</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch
                id="theme-mnav-btn"
                v-model="$vuetify.theme.dark"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-title>{{
              languageSetting.bottomTheme
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { HeaderLang } from '~/@types';

@Component
export default class MobileAppBar extends Vue {
  /* ------------------------------------
  => Local State Declaration
  ------------------------------------ */
  menuSetting: boolean = false;
  menuAccount: boolean = false;
  activeItem: string = 'Home';
  message: boolean = false;
  hints: boolean = false;
  fav: boolean = true;
  menuItems: string[] = [
    this.languageSetting.myBookings,
    this.languageSetting.services,
    this.languageSetting.aboutUs,
    this.languageSetting.contact
  ];

  /* ------------------------------------
  => Methods
  ------------------------------------ */
  switchLanguage(params: string): void {
    this.$store.dispatch('ui/changeLanguage', params);
    this.menuItems = [
      this.languageSetting.myBookings,
      this.languageSetting.services,
      this.languageSetting.aboutUs,
      this.languageSetting.contact
    ];
  }

  /* ------------------------------------
  => Setter and Getter
  ** (Adopt store variables to local state)
  ------------------------------------ */
  get languageSetting(): HeaderLang {
    return this.$store.state.ui.languageSetting.header;
  }
}
</script>
<style lang="stylus" scoped>
.menu-title {
  font-size: 10px;
  font-weight: 400;
  font-family: unset;
  margin-top: 2px;
  text-transform: none;
  letter-spacing: inherit;
}
</style>
