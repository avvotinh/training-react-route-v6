import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { css } from "@emotion/css";

import { listProducts } from "./ProductsService";
import ProductCard from "./ProductCard";

const ProductsIndexStyles = css`
  .ProductsIndex {
    &-Radios {
      display: flex;
      align-items: center;

      span {
        width: 35px;
        color: #fff;
        margin-right: 10px;
        font-size: 0.8rem;
      }
      label {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
    &-List {
      margin-top: 10px;
    }
  }
`;

const ProductsIndex = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    if (location.state) {
      console.warn(`Nothing found for ${location.state.id}`);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const data = await listProducts();
      const params = Object.fromEntries([...searchParams]);

      setProductsFromParams(data, params);
    })();
  }, []);

  const setProductsFromParams = (data, params) => {
    if (!Object.keys(params).length) {
      setProducts(data);

      return;
    }

    const dataSorted = [...data].sort((value, other) => {
      const { sort, order } = params;

      switch (order) {
        case "ascending":
          return value[sort] > other[sort] ? 1 : -1;
        case "descending":
          return value[sort] < other[sort] ? 1 : -1;
        default:
          return 0;
      }
    });

    setProducts(dataSorted);
  };

  const updateParams = (event) => {
    const { name, value } = event.target;
    const currentParams = Object.fromEntries([...searchParams]);
    const newParams = { ...currentParams, [name]: value };

    setSearchParams(newParams);
    setProductsFromParams(products, newParams);
  };

  if (products === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={ProductsIndexStyles}>
      <div className="ProductsIndex-Radios">
        <span>Sort:</span>
        <label>
          Name
          <input
            type="radio"
            name="sort"
            value="name"
            onChange={updateParams}
            defaultChecked={searchParams.get("sort") === "name"}
          />
        </label>
        <label>
          Price
          <input
            type="radio"
            name="sort"
            value="price"
            onChange={updateParams}
            defaultChecked={searchParams.get("sort") === "price"}
          />
        </label>
      </div>
      <div className="ProductsIndex-Radios">
        <span>Order:</span>
        <label>
          Ascending
          <input
            type="radio"
            name="order"
            value="ascending"
            onChange={updateParams}
            defaultChecked={searchParams.get("order") === "ascending"}
          />
        </label>
        <label>
          Descending
          <input
            type="radio"
            name="order"
            value="descending"
            onChange={updateParams}
            defaultChecked={searchParams.get("order") === "descending"}
          />
        </label>
      </div>
      <div className="ProductsIndex-List">
        {products.map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductsIndex;
