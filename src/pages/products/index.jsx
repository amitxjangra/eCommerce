import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAllProducts } from "../../redux/slices/products";
import Card from "./components/Card";

const Products = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const search = useSelector((state) => state.search);

  useEffect(() => {
    if (!allProducts.length && !search)
      dispatch({
        type: "api/call",
        payload: {
          url: "/products",
          method: "GET",
          onSuccess: "products/saveAllProducts",
        },
      });
  }, [allProducts, search]);

  return (
    <>
      <div>
        {search
          ? "Showing Results - " +
            search +
            " Found - " +
            allProducts?.length +
            " items"
          : "All Products"}
      </div>
      <div className="flex flex-wrap justify-around gap-5 ">
        {allProducts?.length ? (
          allProducts.map((i, index) => <Card key={index.toString()} {...i} />)
        ) : (
          <>Loading...</>
        )}
      </div>
    </>
  );
};

export default Products;
