import React from "react";
import { addToCart } from "../../../redux/slices/cart";
import { useDispatch } from "react-redux";

const Card = (data) => {
  const dispatch = useDispatch();
  const { image, title, price, description, id } = data;
  const addtoCartFn = () => {
    dispatch(addToCart({ image, price, id, title }));
  };
  return (
    <div className="bg-gray-200 min-w-[100px] max-w-[300px] overflow-hidden flex flex-col gap-2 ">
      <div className="bg-white py-2">
        <img
          className="w-full h-40 object-contain bg-white"
          src={image}
          alt={title}
        />
      </div>
      <div className="flex flex-col gap-2 p-2">
        <h1 className="text-sm text-black">{title}</h1>
        <p className="text-xs text-black">{description}</p>
      </div>
      <div className="flex w-full bg-gray-400 mt-auto h-[40px] justify-between items-center">
        <span className="h-full content-center pl-2 text-black text-xl font-bold">
          ${price}
        </span>
        <button
          className="float-right bg-gray-800 h-full p-2 hover:bg-gray-700 text-white cursor-pointer"
          onClick={addtoCartFn}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
