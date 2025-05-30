export type Product = {
  id: number;
  name: string;
  price: number;
  slug: string;
  image_url: string;
  description: string;
  category: {
    name: string;
  }
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type CartItem = {
  product_id: number;
  quantity: number;
}

export type Inventory = {
  product_id: number;
  product_name: string;
  stock: number;
};

export type Transaction = {
  quantity: number;
  type: string;
  created_at: string;
};

export type Order = {
  id: number;
  total_price: number;
  status: string;
  user: User;
  items: {
    quantity: number;
    product_name: string,
    unit_price: number;
  }[]
};

export type OrderItem = {
  quantity: number;
  product_name: string,
  unit_price: number;
};

export type User = {
  id: string,
  name: string;
  phone_number: string,
  address: string;
  email: string,
};

export type FormSearch = {
  search: string;
  searchField: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;
  page: number;
}

export type ValidationErrorResponse = {
  error: {
    [field: string]: string[];
  };
  status_code: number;
}

