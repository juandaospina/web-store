export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  images: string[];
  price: number;
  category: Category;
}

