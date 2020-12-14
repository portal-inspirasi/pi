/* ------------------------------------
=> Store product related types
------------------------------------ */
export interface Product {
  id: number;
  name: string;
  unit: string;
}

export interface ProductState {
  isTableLoading: boolean;
  listProduct: Product[];
  totalData: number;
}
