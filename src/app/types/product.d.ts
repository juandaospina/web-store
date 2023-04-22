import { LOADING_STATUS } from "../constants";

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
  taxe?: number
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}

export type StatusResponse = typeof LOADING_STATUS[keyof typeof LOADING_STATUS]
