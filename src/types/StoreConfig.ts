export type Product = {
  name: string;
  brand: string;
  img_src: string;
  price: string;
};

export type Accessory = Product & {
  color: string[];
};

export type Shoe = Product & {
  size: string[];
};

export type Electronic = Product & {
  specs: string[];
};

export type BuyNowCategories = {
  accessories: Accessory[];
  shoes: Shoe[];
  electronics: Electronic[];
};
