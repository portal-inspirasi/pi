import { mount, RouterLinkStub } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vue from 'vue';
import LayoutError from '~/layouts/error.vue';

Vue.use(Vuetify);

// Handle data-app warn
const app = document.createElement('div');
app.setAttribute('data-app', 'true');
document.body.appendChild(app);

describe('LayoutError unit test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test config of loaded element is working or not
  test('is instantiated', () => {
    const wrapper = mount(LayoutError, {
      vuetify: new Vuetify(),
      propsData: {
        error: {
          statusCode: 404
        }
      },
      stubs: {
        NuxtLink: RouterLinkStub
      }
    });

    expect(wrapper).toBeTruthy();
  });
});
