export interface ProductI {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  quantity?: number;
  totalAmount?: number;
}

export interface ListOfProductsI {
  docs: ProductI[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
