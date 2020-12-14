import Store, { ProductState, Product } from '../@types';

/* ------------------------------------------------
=> State
----------------------------------------------- */
export const state = (): ProductState => ({
  isTableLoading: true,
  listProduct: [
    {
      id: 1,
      name: 'ASSY A',
      unit: 'pcs'
    },
    {
      id: 2,
      name: 'ASSY B',
      unit: 'pcs'
    },
    {
      id: 3,
      name: 'ASSY C',
      unit: 'pcs'
    }
  ],
  totalData: 3
});

/* ------------------------------------------------
=> Save Initial State
----------------------------------------------- */
const initialState: ProductState = state();

/* ------------------------------------------------
=> Mutations
----------------------------------------------- */
export const mutations = {
  resetState(state: ProductState): void {
    Object.assign(state, initialState);
  },
  setListProduct(state: ProductState, params: Product[]): void {
    state.listProduct = params;
  }
};

/* ------------------------------------------------
=> Actions
----------------------------------------------- */
export const actions: any = {
  async resetState(store: Store<any> | any): Promise<void> {
    await store.commit('resetState');
  },
  async updateListProduct(
    store: Store<any> | any,
    params: Product[]
  ): Promise<void> {
    await store.commit('setListProduct', params);
  }
};
