import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { state, actions, mutations } from '~/store/ui';
import AppBar from '~/components/AppBar.vue';

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VueRouter);
const router = new VueRouter();

// Mock data-app to vue-test-utils
const app = document.createElement('div');
app.setAttribute('data-app', 'true');
document.body.appendChild(app);

describe('AppBar unit test', () => {
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

  // Test config of loaded element is working or not
  test('is instantiated', () => {
    store.dispatch = jest.fn(() => Promise.resolve());
    const wrapper = mount(AppBar, {
      store,
      vuetify: new Vuetify(),
      router
    });
    expect(wrapper).toBeTruthy();
  });

  test('change theme color to dark', () => {
    store.dispatch = jest.fn(() => Promise.resolve());
    const wrapper = mount(AppBar, {
      store,
      vuetify: new Vuetify(),
      router
    });
    // Initial value
    expect(wrapper.vm.$vuetify.theme.dark).toBe(false);
    // ------------------------------------------------

    const switchThemeButton = wrapper.find('#switch-theme');
    expect(switchThemeButton.exists()).toBe(true); // Button is exist
    switchThemeButton.trigger('click');
    // Result
    expect(wrapper.vm.$vuetify.theme.dark).toBe(true);
    // ------------------------------------------------
  });

  test('change language to Bahasa Indonesia', () => {
    store.dispatch = jest.fn(() => Promise.resolve(actions.changeLanguage(store, 'ID')));
    const wrapper: any = mount(AppBar, {
      store,
      vuetify: new Vuetify(),
      router
    });
    // Initial values
    expect(wrapper.find('#my-bookings-btn').text()).toBe('My Bookings')
    expect(wrapper.find('#services-btn').text()).toBe('Services')
    expect(wrapper.find('#about-us-btn').text()).toBe('About Us')
    expect(wrapper.find('#contact-btn').text()).toBe('Contact')
    // ---------------------------------------------------------------

    const languageMenu = wrapper.find('#language-menu');
    expect(languageMenu.exists()).toBe(true);
    languageMenu.trigger('click'); // Trigger language menu button

    wrapper.vm.$nextTick(() => {
      const languageButtonID = wrapper.find('#language-id');
      expect(languageButtonID.exists()).toBe(true);
      languageButtonID.trigger('click'); // Trigger change language

      wrapper.vm.$nextTick(() => {
        // Result
        expect(wrapper.find('#my-bookings-btn').text()).toBe('Pesananku')
        expect(wrapper.find('#services-btn').text()).toBe('Pelayanan')
        expect(wrapper.find('#about-us-btn').text()).toBe('Tentang Kami')
        expect(wrapper.find('#contact-btn').text()).toBe('Kontak')
        // ---------------------------------------------------------------
      })
    });
  });
});
