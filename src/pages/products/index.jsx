import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Card from "./components/Card";

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "api/call",
      payload: {
        url: "/products",
        method: "GET",
        onSuccess: (data) => {
          setProducts(data);
        },
        headers: {},
      },
    });
  }, []);
  console.log(products);
  return (
    <>
      <div>All Products</div>
      <div className="flex flex-wrap justify-around gap-5 ">
        {products.map((i) => (
          <Card {...i} />
        ))}
      </div>
    </>
  );
};

export default Products;
