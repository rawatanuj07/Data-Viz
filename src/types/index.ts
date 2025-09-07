export interface Product {
  id: string;
  productName: string;
  sales: number;
  profit: number;
  te: number;
  credit: number;
  amazonFee: number;
  profitPercentage: number;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AppState {
  user: User | null;
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

export interface SidebarTab {
  id: string;
  label: string;
  icon: string;
  component: React.ComponentType;
}


