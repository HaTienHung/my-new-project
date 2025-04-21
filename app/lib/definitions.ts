export type Product = {
  id: number;
  name: string;
  price: number;
  slug: string;
  category: {
    name: string;
  }
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};

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
  user: {
    name: string;
    phone_number: string,
    address: string;
    email: string,
  }
  items: {
    quantity: number;
    product_name: string,
    unit_price: number;
  }[]
};