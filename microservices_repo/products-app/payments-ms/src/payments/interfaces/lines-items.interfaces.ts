export interface LineItems {
  price_data: PriceData;
  quantity: number;
}

export interface PriceData {
  currency: string;
  product_data: ProductData;
  unit_amount: number;
}

export interface ProductData {
  name: string;
  images: string[];
}
