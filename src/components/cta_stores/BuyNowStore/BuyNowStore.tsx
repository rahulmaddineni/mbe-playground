import React from "react";
import { BuyNowCategories } from "../../../types/StoreConfig.ts";
import BuyNowCard from "./BuyNowCard.tsx";
import "../../../styles/storestyles.css";
import { getBuyNowCategories } from "../../../helpers/store_helper.ts";

const BuyNowStore: React.FC<{}> = () => {
  const categories: BuyNowCategories = getBuyNowCategories();

  return (
    <div>
      <div className="product-row">
        <div className="product-row-title">Electronics</div>
        <div className="product-cards">
          {categories.electronics.map((product, index) => (
            <BuyNowCard key={index} product={product} />
          ))}
        </div>
      </div>
      <div className="product-row">
        <div className="product-row-title">Shoes</div>
        <div className="product-cards">
          {categories.shoes.map((product, index) => (
            <BuyNowCard key={index} product={product} />
          ))}
        </div>
      </div>
      <div className="product-row">
        <div className="product-row-title">Accessories</div>
        <div className="product-cards">
          {categories.accessories.map((product, index) => (
            <BuyNowCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyNowStore;
