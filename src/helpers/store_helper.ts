import {
  BuyNowCategories,
  Accessory,
  Electronic,
  Shoe,
} from "../types/StoreConfig.ts";

const getAccessoryProducts = (): Accessory[] => [
  {
    name: "Meta Glasses",
    brand: "RayBan",
    img_src: "/assets/images/meta_glasses.png",
    color: ["Black", "Green"],
    price: "379",
  },
  {
    name: "Bag Micro 2L",
    brand: "Lululemon",
    img_src: "/assets/images/lululemon_bag.png",
    color: ["Pink", "Green", "Yellow"],
    price: "68",
  },
  {
    name: "Airpods",
    brand: "Apple",
    img_src: "/assets/images/apple_watch.png",
    color: ["Stainless Steel", "Yellow", "Blue"],
    price: "600",
  },
  {
    name: "Hat",
    brand: "Adidas",
    img_src: "/assets/images/adidas_hat.png",
    color: ["Blue", "Orange", "White"],
    price: "25",
  },
];

const getShoeProducts = (): Shoe[] => [
  {
    name: "Metcon 9",
    brand: "Nike",
    img_src: "/assets/images/nike_metcon.png",
    size: ["6", "6.5", "7", "9", "10"],
    price: "150",
  },
  {
    name: "Air Jordan 1",
    brand: "Nike",
    img_src: "/assets/images/nike_air_jordan.png",
    size: ["7.5", "8", "9", "11.5"],
    price: "200",
  },
  {
    name: "Blazer Mid'77",
    brand: "Nike",
    img_src: "/assets/images/nike_blazer.png",
    size: ["7", "8", "9.5", "11"],
    price: "200",
  },
  {
    name: "Air Max 270",
    brand: "Nike",
    img_src: "/assets/images/nike_air_max.png",
    size: ["6", "7", "9.5", "10.5"],
    price: "160",
  },
];

const getElectronicProducts = (): Electronic[] => [
  {
    name: "Quest 3",
    brand: "Meta",
    img_src: "/assets/images/meta_quest_3.png",
    specs: ["256GB", "512GB"],
    price: "499",
  },
  {
    name: "Quest 2",
    brand: "Meta",
    img_src: "/assets/images/meta_quest_2.png",
    specs: ["256GB", "512GB"],
    price: "299",
  },
  {
    name: "16'Macbook Pro",
    brand: "Apple",
    img_src: "/assets/images/apple_macbook_pro.png",
    specs: ["M3 Pro", "M3 Max"],
    price: "2499",
  },
  {
    name: "Airpods",
    brand: "Apple",
    img_src: "/assets/images/apple_airpods.png",
    specs: [],
    price: "250",
  },
];

export const getBuyNowCategories = (): BuyNowCategories => ({
  accessories: getAccessoryProducts(),
  shoes: getShoeProducts(),
  electronics: getElectronicProducts(),
});

export const getProductOptions = (
  product: Accessory | Shoe | Electronic
): { label: string; value: string }[] => {
  if ("color" in product) {
    // The product is a Accessory
    return product.color.map((color) => ({
      label: color,
      value: color,
    }));
  }
  if ("size" in product) {
    // The product is a Shoe
    return product.size.map((size) => ({
      label: size,
      value: size,
    }));
  } else if ("specs" in product) {
    // The product is an Electronic
    return product.specs.map((spec) => ({ label: spec, value: spec }));
  } else {
    // The product type is unknown
    return [];
  }
};
