<template>
  <div>
    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="miniVariant = !miniVariant" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        text
        class="transform-none ma-2"
        @click="$router.push('/tutorial')"
      >
        Tutorial
      </v-btn>
      <v-btn text class="transform-none ma-2"> Fitur </v-btn>
      <v-btn text class="transform-none ma-2"> Kontak Penting </v-btn>
      <v-btn text class="transform-none ma-2"> Tentang Applikasi </v-btn>
      <v-btn
        id="switch-theme"
        depressed
        small
        fab
        class="transform-none ma-2"
        @click="switchTheme"
      >
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
      <!-- <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            id="language-menu"
            depressed
            small
            fab
            class="transform-none ma-2"
            v-bind="attrs"
            v-on="on"
          >
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
            <v-list-item id="language-en" link @click="switchLanguage('EN')">
              <v-list-item-title
                v-text="languageSetting.english"
              ></v-list-item-title>
            </v-list-item>
            <v-list-item id="language-id" link @click="switchLanguage('ID')">
              <v-list-item-title
                v-text="languageSetting.bahasa"
              ></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu> -->
      <v-btn
        id="account-btn"
        depressed
        rounded
        color="primary"
        class="transform-none ma-2"
      >
        <v-icon left> mdi-account-circle </v-icon>
        {{ timeGreetings }}
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer :mini-variant="miniVariant" clipped app permanent>
      <v-list>
        <div v-for="(item, index) in menuItems" :key="index">
          <v-list-group
            v-if="item.items"
            :key="item.title"
            :prepend-icon="item.icon"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="subItem in item.items"
              :key="subItem.title"
              :to="subItem.to"
            >
              <v-list-item-content>
                <v-list-item-title v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-item v-if="item.to" :to="item.to" router exact>
            <template>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </template>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { SidebarMenuItem } from '~/@types';

@Component
export default class AppBar extends Vue {
  /* ------------------------------------
  => Local State Declaration
  ------------------------------------ */
  menu: boolean = false;
  drawer: boolean = false;
  miniVariant: boolean = true;
  title: string = 'Applikasi Kalkulator Manufaktur';
  timeGreetings: string = 'Halo!';
  menuItems: SidebarMenuItem[] = [
    {
      icon: 'mdi-view-dashboard',
      title: 'Kalkulator',
      to: '/'
    },
    {
      icon: 'mdi-credit-card-clock-outline',
      title: 'Riwayat Kalkulasi',
      to: '/history'
    },
    {
      icon: 'mdi-format-list-text',
      title: 'List Produk',
      to: '/products'
    },
    {
      icon: 'mdi-format-list-bulleted-type',
      title: 'List Bahan',
      to: '/materials'
    },
    {
      icon: 'mdi-cog',
      title: 'Pengaturan Kalkulasi',
      to: '/setting'
    }
  ];

  /* ------------------------------------
  => Mounted (Lifecycle)
  ------------------------------------ */
  mounted(): void {
    this.setGreetings();
  }

  /* ------------------------------------
  => Methods
  ------------------------------------ */
  switchTheme(): void {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
  }

  switchLanguage(params: string): void {
    this.$store.dispatch('ui/changeLanguage', params);
  }

  setGreetings(): void {
    const now = new Date();
    const hourNow = now.getHours();
    const minutesNow = now.getMinutes();
    let temp = '';
    if (minutesNow < 10) {
      temp = minutesNow.toString();
      temp = '0' + temp;
    } else {
      temp = minutesNow.toString();
    }
    const timeNow: number = Number(hourNow.toString() + temp);
    if (timeNow > 1800) {
      this.timeGreetings = `Selamat Malam!`;
    } else if (timeNow > 1500 && timeNow < 1801) {
      this.timeGreetings = `Selamat Sore!`;
    } else if (timeNow > 1100 && timeNow < 1501) {
      this.timeGreetings = `Selamat Siang!`;
    } else if (timeNow < 1101) {
      this.timeGreetings = `Selamat Pagi!`;
    }
  }

  /* ------------------------------------
  => Setter and Getter
  ** (Adopt store variables to local state)
  ------------------------------------ */
  get languageSetting(): boolean {
    return this.$store.state.ui.languageSetting.header;
  }
}
</script>
<style lang="stylus" scoped>
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
