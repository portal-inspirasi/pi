import Store, { Combination, CombinationState } from '../@types';

/* ------------------------------------------------
=> State
----------------------------------------------- */
export const state = (): CombinationState => ({
  isTableLoading: true,
  listCombination: [
    {
      id: 1,
      materials: [
        {
          id: 2,
          amount: 20
        },
        {
          id: 3,
          amount: 10
        }
      ]
    },
    {
      id: 2,
      materials: [
        {
          id: 1,
          amount: 5
        },
        {
          id: 3,
          amount: 10
        }
      ]
    },
    {
      id: 3,
      materials: [
        {
          id: 1,
          amount: 20
        }
      ]
    }
  ],
  totalData: 3
});

/* ------------------------------------------------
=> Save Initial State
----------------------------------------------- */
const initialState: CombinationState = state();

/* ------------------------------------------------
=> Mutations
----------------------------------------------- */
export const mutations = {
  resetState(state: CombinationState): void {
    Object.assign(state, initialState);
  },
  setListCombination(state: CombinationState, params: Combination[]): void {
    state.listCombination = params;
  }
};

/* ------------------------------------------------
=> Actions
----------------------------------------------- */
export const actions: any = {
  async resetState(store: Store<any> | any): Promise<void> {
    await store.commit('resetState');
  },
  async updateListCombination(
    store: Store<any> | any,
    params: Combination[]
  ): Promise<void> {
    await store.commit('setListCombination', params);
  }
};
