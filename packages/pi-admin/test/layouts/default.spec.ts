import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import { state, actions, mutations } from '~/store/ui';
import LayoutDefault from '~/layouts/default.vue';

Vue.use(Vuex);
Vue.use(Vuetify);

// Handle data-app warn
const app = document.createElement('div');
app.setAttribute('data-app', 'true');
document.body.appendChild(app);

describe('LayoutDefault unit test', () => {
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
    const wrapper = shallowMount(LayoutDefault, {
      store,
      vuetify: new Vuetify(),
      stubs: {
        NuxtLink: RouterLinkStub
      }
    });

    expect(wrapper).toBeTruthy();
  });
});
