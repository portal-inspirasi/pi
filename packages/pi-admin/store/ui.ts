import Store, { UiState } from '../@types';

/* ----------------------------------------------
=> State
----------------------------------------------- */
export const state = (): UiState => ({
  languageSetting: {
    header: {
      myBookings: 'My Bookings',
      services: 'Services',
      aboutUs: 'About Us',
      contact: 'Contact',
      selectLang: 'Select Language',
      comingLang: 'Few more languages are coming soon!',
      english: 'English (EN - US)',
      bahasa: 'Bahasa Indonesia (ID)',
      registerLogin: 'Register / Login',
      bottomHome: 'Home',
      bottomMenu: 'Menu',
      bottomSetting: 'Setting',
      bottomAccount: 'Account',
      bottomMessages: 'Enable Messages',
      bottomHint: 'Enable Hint',
      bottomTheme: 'Dark Mode'
    },
    tripBox: {
      arrivalLabel: 'Destination',
      arrivalPlaceholder: 'Where are you going?',
      arrivalHint: 'Your drop off location',
      arrivalDateLabel: 'Arrival Date',
      arrivalDatePlaceholder: 'When?',
      arrivalDateHint: 'Your planned date to arrive',
      arrivalTimeLabel: 'Arrival Time',
      arrivalTimePlaceholder: 'At what time?',
      arrivalTimeHint: 'Your planned time to arrive',
      departureLabel: 'Departure (Pick-up)',
      departurePlaceholder: 'Where should we pick you up?',
      departureHint: 'Your pick up location',
      departureDateLabel: 'Departure Date',
      departureDatePlaceholder: 'When?',
      departureDateHint: 'Your planned date to go',
      departureTimeLabel: 'Departure Time',
      departureTimePlaceholder: 'At what time?',
      departureTimeHint: 'Your planned time to go',
      couponButtonActive: `I don't want to use any coupon`,
      couponButtonInactive: 'Do you have a coupon?',
      couponLabel: 'Coupon',
      couponPlaceholder: 'Enter a promo code here',
      couponHint: 'Try your luck :)',
      bookButton: 'Book a Ride!'
    },
    homeContent: {
      announcements: 'Announcements:',
      promoAndDeals: 'Promo & Deals'
    },
    footer: {
      firstLineDisclaimer: 'Copyright © 2019 Agtran Travel Sdn. Bhd.',
      secondLineDisclaimer:
        'MOTAC License No. (9005) | Registration No. (1246969-V)'
    }
  }
});

/* ----------------------------------------------
=> Mutations
----------------------------------------------- */
export const mutations = {
  setEnglishAsCurrentLanguage(state: UiState): void {
    state.languageSetting.header = {
      myBookings: 'My Bookings',
      services: 'Services',
      aboutUs: 'About Us',
      contact: 'Contact',
      selectLang: 'Select Language',
      comingLang: 'Few more languages are coming soon!',
      english: 'English (EN - US)',
      bahasa: 'Bahasa Indonesia (ID)',
      registerLogin: 'Register / Login',
      bottomHome: 'Home',
      bottomMenu: 'Menu',
      bottomSetting: 'Setting',
      bottomAccount: 'Account',
      bottomMessages: 'Enable Messages',
      bottomHint: 'Enable Hint',
      bottomTheme: 'Dark Mode'
    };
    state.languageSetting.tripBox = {
      arrivalLabel: 'Destination',
      arrivalPlaceholder: 'Where are you going?',
      arrivalHint: 'Your drop off location',
      arrivalDateLabel: 'Arrival Date',
      arrivalDatePlaceholder: 'When?',
      arrivalDateHint: 'Your planned date to arrive',
      arrivalTimeLabel: 'Arrival Time',
      arrivalTimePlaceholder: 'At what time?',
      arrivalTimeHint: 'Your planned time to arrive',
      departureLabel: 'Departure (Pick-up)',
      departurePlaceholder: 'Where should we pick you up?',
      departureHint: 'Your pick up location',
      departureDateLabel: 'Departure Date',
      departureDatePlaceholder: 'When?',
      departureDateHint: 'Your planned date to go',
      departureTimeLabel: 'Departure Time',
      departureTimePlaceholder: 'At what time?',
      departureTimeHint: 'Your planned time to go',
      couponButtonActive: `I don't want to use any coupon`,
      couponButtonInactive: 'Do you have a coupon?',
      couponLabel: 'Coupon',
      couponPlaceholder: 'Enter a promo code here',
      couponHint: 'Try your luck :)',
      bookButton: 'Book a Ride!'
    };
    state.languageSetting.homeContent = {
      announcements: 'Announcements:',
      promoAndDeals: 'Promo & Deals'
    };
    state.languageSetting.footer = {
      firstLineDisclaimer: 'Copyright © 2019 Agtran Travel Sdn. Bhd.',
      secondLineDisclaimer:
        'MOTAC License No. (9005) | Registration No. (1246969-V)'
    };
  },
  setBahasaAsCurrentLanguage(state: UiState): void {
    state.languageSetting.header = {
      myBookings: 'Pesananku',
      services: 'Pelayanan',
      aboutUs: 'Tentang Kami',
      contact: 'Kontak',
      selectLang: 'Pilih Bahasa',
      comingLang: 'Beberapa bahasa yang lain akan segera hadir!',
      english: 'English (EN - US)',
      bahasa: 'Bahasa Indonesia (ID)',
      registerLogin: 'Daftar / Masuk',
      bottomHome: 'Beranda',
      bottomMenu: 'Menu',
      bottomSetting: 'Setelan',
      bottomAccount: 'Akun',
      bottomMessages: 'Izinkan Pesan',
      bottomHint: 'Izinkan Petunjuk',
      bottomTheme: 'Mode Gelap'
    };
    state.languageSetting.tripBox = {
      arrivalLabel: 'Lokasi Tujuan',
      arrivalPlaceholder: 'Ke mana Anda akan pergi?',
      arrivalHint: 'Titik antar Anda',
      arrivalDateLabel: 'Tanggal Sampai',
      arrivalDatePlaceholder: 'Kapan?',
      arrivalDateHint: 'Rencana tanggal Anda sampai tujuan',
      arrivalTimeLabel: 'Waktu Sampai',
      arrivalTimePlaceholder: 'Pukul berapa?',
      arrivalTimeHint: 'Rencana pukul berapa Anda sampai tujuan',
      departureLabel: 'Lokasi Jemput',
      departurePlaceholder: 'Dari mana Anda ingin pergi?',
      departureHint: 'Lokasi tempat Anda ingin dijemput',
      departureDateLabel: 'Tanggal Keberangkatan',
      departureDatePlaceholder: 'Kapan?',
      departureDateHint: 'Rencana tanggal keberangkatan Anda',
      departureTimeLabel: 'Waktu Keberangkatan',
      departureTimePlaceholder: 'Pukul berapa?',
      departureTimeHint: 'Rencana waktu keberangkatan Anda',
      couponButtonActive: `Saya tidak ingin menggunakan kupon`,
      couponButtonInactive: 'Apakah Anda memiliki kupon?',
      couponLabel: 'Kupon',
      couponPlaceholder: 'Masukkan kod promosi di sini',
      couponHint: 'Coba keberuntungan Anda :)',
      bookButton: 'Pesan Kendaraan!'
    };
    state.languageSetting.homeContent = {
      announcements: 'Pengumuman:',
      promoAndDeals: 'Promo & Diskon'
    };
    state.languageSetting.footer = {
      firstLineDisclaimer: 'Hakcipta © 2019 Agtran Travel Sdn. Bhd.',
      secondLineDisclaimer:
        'MOTAC Lisensi No. (9005) | Registrasi No. (1246969-V)'
    };
  }
};

/* ----------------------------------------------
=> Actions
----------------------------------------------- */
export const actions = {
  changeLanguage(store: Store<UiState> | any, params: string): void {
    if (params === 'EN') {
      store.commit('setEnglishAsCurrentLanguage');
    } else {
      store.commit('setBahasaAsCurrentLanguage');
    }
  }
};
