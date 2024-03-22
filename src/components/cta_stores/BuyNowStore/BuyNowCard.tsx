import React from "react";
import Select from "react-select";
import { Accessory, Shoe, Electronic } from "../../../types/StoreConfig.ts";
import { getProductOptions } from "../../../helpers/store_helper.ts";

type Props = {
  product: Accessory | Shoe | Electronic;
};

const BuyNowCard: React.FC<Props> = ({ product }) => {
  const productOptions = getProductOptions(product);
  return (
    <div className="buy-now-card">
      <img src={product.img_src} alt={product.name} />
      <div className="product-info">
        <div>
          <p className="product-name">{product.name}</p>
          <p className="product-brand">{product.brand}</p>
          <p className="product-price">${product.price}</p>
        </div>
        {productOptions.length > 0 && (
          <Select
            id="product-options"
            options={productOptions}
            isSearchable={false}
            defaultValue={productOptions[0]}
          />
        )}
      </div>
      <button>Buy Now</button>
    </div>
  );
};
export default BuyNowCard;
