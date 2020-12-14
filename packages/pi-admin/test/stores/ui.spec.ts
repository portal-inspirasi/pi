import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { state, actions, mutations } from '~/store/ui';
import IndexPage from '~/pages/index.vue';

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VueRouter);
const router = new VueRouter();

// Handle data-app warn
const app = document.createElement('div');
app.setAttribute('data-app', 'true');
document.body.appendChild(app);

describe('Store ui unit test', () => {
  // Create vuex store
  let store: any;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        ui: {
          state,
          mutations,
          actions
        }
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('translate to Bahasa Indonesia functionalities', async () => {
    store.dispatch = jest.fn(() => Promise.resolve());
    const wrapper: any = mount(IndexPage, { store, vuetify: new Vuetify(), router });
    expect(wrapper.find('#announcement-lable').text()).toBe('Announcements:')
    expect(wrapper.find('#promo-lable').text()).toBe('Promo & Deals')

    await actions.changeLanguage(store, 'ID'); // Trigger translate to Bahasa Indonesia

    expect(wrapper.find('#announcement-lable').text()).toBe('Pengumuman:')
    expect(wrapper.find('#promo-lable').text()).toBe('Promo & Diskon')
  });

  test('translate to Bahasa Indonesia then translate back to English case', async () => {
    store.dispatch = jest.fn(() => Promise.resolve());
    const wrapper: any = mount(IndexPage, { store, vuetify: new Vuetify(), router });
    expect(wrapper.find('#announcement-lable').text()).toBe('Announcements:')
    expect(wrapper.find('#promo-lable').text()).toBe('Promo & Deals')

    await actions.changeLanguage(store, 'ID'); // Trigger translate to Bahasa Indonesia
    expect(wrapper.find('#announcement-lable').text()).toBe('Pengumuman:')
    expect(wrapper.find('#promo-lable').text()).toBe('Promo & Diskon')

    await actions.changeLanguage(store, 'EN'); // Trigger translate back to English
    expect(wrapper.find('#announcement-lable').text()).toBe('Announcements:')
    expect(wrapper.find('#promo-lable').text()).toBe('Promo & Deals')
  });
});
