export type Product = {
  id: number;
  name: string;
  price: number;
  slug: string;
  category: {
    name: string;
  }
};