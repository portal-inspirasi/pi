import { mount, RouterLinkStub } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import { state, actions, mutations } from '~/store/ui';
import IndexPage from '~/pages/index.vue';

Vue.use(Vuex);
Vue.use(Vuetify);

describe('IndexPage', () => {
  // Create vuex store
  let store: any;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        ui: {
          state,
          actions,
          mutations
        }
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test config of loaded element is working or not
  test('is a Vue instance', () => {
    const wrapper = mount(IndexPage, {
      store,
      vuetify: new Vuetify(),
      stubs: {
        NuxtLink: RouterLinkStub
      }
    });
    expect(wrapper).toBeTruthy();
  });
});
