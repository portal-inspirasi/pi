import Store, { Material, MaterialState } from '../@types';

/* ------------------------------------------------
=> State
----------------------------------------------- */
export const state = (): MaterialState => ({
  isTableLoading: true,
  listMaterial: [
    {
      id: 1,
      name: 'Material I',
      unit: 'Kg'
    },
    {
      id: 2,
      name: 'Material II',
      unit: 'm'
    },
    {
      id: 3,
      name: 'Material III',
      unit: 'lt'
    }
  ],
  totalData: 3
});

/* ------------------------------------------------
=> Save Initial State
----------------------------------------------- */
const initialState: MaterialState = state();

/* ------------------------------------------------
=> Mutations
----------------------------------------------- */
export const mutations = {
  resetState(state: MaterialState): void {
    Object.assign(state, initialState);
  },
  setListMaterial(state: MaterialState, params: Material[]): void {
    state.listMaterial = params;
  }
};

/* ------------------------------------------------
=> Actions
----------------------------------------------- */
export const actions: any = {
  async resetState(store: Store<any> | any): Promise<void> {
    await store.commit('resetState');
  },
  async updateListMaterial(
    store: Store<any> | any,
    params: Material[]
  ): Promise<void> {
    await store.commit('setListMaterial', params);
  }
};
