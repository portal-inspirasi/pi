import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { state, actions, mutations } from '~/store/ui';
import MobileAppBar from '~/components/MobileAppBar.vue';

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VueRouter);
const router = new VueRouter();

// Mock data-app to vue-test-utils
const app = document.createElement('div');
app.setAttribute('data-app', 'true');
document.body.appendChild(app);

describe('MobileAppBar unit test', () => {
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
    const wrapper = mount(MobileAppBar, {
      store,
      vuetify: new Vuetify(),
      router
    });
    expect(wrapper).toBeTruthy();
  });

  test('menu buttons are rendered propperly', () => {
    store.dispatch = jest.fn(() => Promise.resolve());
    const wrapper = mount(MobileAppBar, {
      store,
      vuetify: new Vuetify(),
      router
    });
    
    const menuButtons = wrapper.findAll('.v-btn')
    expect(menuButtons.length).toBe(4)
    // Consist of Home, Menu, Setting and Account
  });

  test('change theme color to dark', () => {
    store.dispatch = jest.fn(() => Promise.resolve());
    const wrapper = mount(MobileAppBar, {
      store,
      vuetify: new Vuetify(),
      router
    });
    // Initial value
    expect(wrapper.vm.$vuetify.theme.dark).toBe(false);
    // ------------------------------------------------

    const switchThemeButton = wrapper.find('#account-mnav-btn');
    expect(switchThemeButton.exists()).toBe(true); // Button is exist
    switchThemeButton.trigger('click');

    wrapper.vm.$nextTick(() => {
      const themeButton = wrapper.find('#theme-mnav-btn');
      expect(themeButton.exists()).toBe(true);
      themeButton.trigger('click'); // Trigger change theme

      // Result
      expect(wrapper.vm.$vuetify.theme.dark).toBe(true);
      // ------------------------------------------------
    })
  });

  test('change language to Bahasa Indonesia', () => {
    store.dispatch = jest.fn(() => Promise.resolve(actions.changeLanguage(store, 'ID')));
    const wrapper: any = mount(MobileAppBar, {
      store,
      vuetify: new Vuetify(),
      router
    });
    // Initial values
    expect(wrapper.find('#home-mnav-btn').text()).toBe('Home')
    expect(wrapper.find('#menu-mnav-btn').text()).toBe('Menu')
    expect(wrapper.find('#setting-mnav-btn').text()).toBe('Setting')
    expect(wrapper.find('#account-mnav-btn').text()).toBe('Account')
    // ---------------------------------------------------------------

    const languageMenu = wrapper.find('#setting-mnav-btn');
    expect(languageMenu.exists()).toBe(true);
    languageMenu.trigger('click'); // Trigger language menu button

    wrapper.vm.$nextTick(() => {
      const languageButtonID = wrapper.find('#language-id-mnav-btn');
      expect(languageButtonID.exists()).toBe(true);
      languageButtonID.trigger('click'); // Trigger change language

      wrapper.vm.$nextTick(() => {
        // Result
        expect(wrapper.find('#home-mnav-btn').text()).toBe('Beranda')
        expect(wrapper.find('#menu-mnav-btn').text()).toBe('Menu')
        expect(wrapper.find('#setting-mnav-btn').text()).toBe('Setelan')
        expect(wrapper.find('#account-mnav-btn').text()).toBe('Akun')
        // ---------------------------------------------------------------
      })
    });
  });
});
