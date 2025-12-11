export interface ProductModel {
  id: number;
  title: string;
  price: number;
  image: string;
  badge?: string;
  rating?: number;
}


export interface ProductCatModel {
  creationAt: Date;
  id: number;
  image: string;
  name: string;
  slug: string;
  updatedAt: Date;
}

export interface ProductListModel {
  productsMap: any;
  allProductIds: any;
  categoryProductIds: any;
}