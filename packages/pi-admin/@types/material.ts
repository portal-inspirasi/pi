/* ------------------------------------
=> Store material related types
------------------------------------ */
export interface Material {
  id: number;
  name: string;
  unit: string;
}

export interface MaterialState {
  isTableLoading: boolean;
  listMaterial: Material[];
  totalData: number;
}
