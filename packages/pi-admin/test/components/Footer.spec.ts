import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { state, actions, mutations } from '~/store/ui';
import Footer from '~/components/Footer.vue';

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VueRouter);
const router = new VueRouter();

describe('Footer unit test', () => {
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
    const wrapper = mount(Footer, {
      store,
      vuetify: new Vuetify(),
      router
    });
    expect(wrapper).toBeTruthy();
  });

  test('social media buttons are rendered propperly', () => {
    store.dispatch = jest.fn(() => Promise.resolve());
    const wrapper = mount(Footer, {
      store,
      vuetify: new Vuetify(),
      router
    });
    
    const socialMediaButtons = wrapper.findAll('.v-btn')
    expect(socialMediaButtons.length).toBe(4)
    // Consist of facebook, twitter, linkedIn and instagram
  });
});
