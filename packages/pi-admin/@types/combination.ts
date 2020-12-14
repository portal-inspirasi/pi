/* ------------------------------------
=> Store combination related types
------------------------------------ */
export interface CombinationMaterial {
  id: number;
  amount: number;
}

export interface Combination {
  id: number;
  materials: CombinationMaterial[];
}

export interface CombinationState {
  isTableLoading: boolean;
  listCombination: Combination[];
  totalData: number;
}
