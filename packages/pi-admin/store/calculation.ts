import Store, { CalculationState } from '../@types';

/* ------------------------------------------------
=> State
----------------------------------------------- */
export const state = (): CalculationState => ({
  isTableLoading: true,
  calculationHistories: [],
  totalData: 0
});

/* ------------------------------------------------
=> Save Initial State
----------------------------------------------- */
const initialState: CalculationState = state();

/* ------------------------------------------------
=> Mutations
----------------------------------------------- */
export const mutations = {
  resetState(state: CalculationState): void {
    Object.assign(state, initialState);
  },
  emptyHistory(state: CalculationState): void {
    state.calculationHistories = [];
  },
  addToHistory(state: CalculationState, processedCalculation: any): void {
    state.calculationHistories.push(processedCalculation);
  }
};

/* ------------------------------------------------
=> Actions
----------------------------------------------- */
export const actions: any = {
  async clearHistory(store: Store<any> | any): Promise<void> {
    console.warn('clearing Hisory');
    await store.commit('emptyHistory');
  },
  async saveToHistory(
    store: Store<any> | any,
    processedCalculation: any
  ): Promise<void> {
    await store.commit('addToHistory', processedCalculation);
  }
};
