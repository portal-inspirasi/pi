import Store, { SettingState } from '../@types';

/* ------------------------------------------------
=> State
----------------------------------------------- */
export const state = (): SettingState => ({
  isTableLoading: true,
  items: [
    {
      name: 'ASSY A',
      materialii: 20,
      materialiii: 10
    },
    {
      name: 'ASSY B',
      materiali: 5,
      materialiii: 10
    },
    {
      name: 'ASSY C',
      materiali: 20
    }
  ],
  headers: [
    {
      text: 'name',
      value: 'name'
    },
    {
      text: 'Material I',
      value: 'materiali'
    },
    {
      text: 'Material II',
      value: 'materialii'
    },
    {
      text: 'Material III',
      value: 'materialiii'
    }
  ],
  percentage: 10
});

/* ------------------------------------------------
=> Save Initial State
----------------------------------------------- */
const initialState: SettingState = state();

/* ------------------------------------------------
=> Mutations
----------------------------------------------- */
export const mutations = {
  resetState(state: SettingState): void {
    Object.assign(state, initialState);
  },
  setItems(state: SettingState, params: any[]): void {
    state.items = params;
  },
  setHeaders(state: SettingState, params: any[]): void {
    state.headers = params;
  },
  setPercentage(state: SettingState, params: number): void {
    state.percentage = params;
  }
};

/* ------------------------------------------------
=> Actions
----------------------------------------------- */
export const actions: any = {
  async resetState(store: Store<SettingState> | any): Promise<void> {
    await store.commit('resetState');
  },
  async updateTable(
    store: Store<SettingState> | any,
    params: any
  ): Promise<void> {
    await store.commit('setHeaders', params.headers);
    await store.commit('setItems', params.items);
  },
  async changePercentage(
    store: Store<SettingState> | any,
    params: number
  ): Promise<void> {
    await store.commit('setPercentage', params);
  }
};
