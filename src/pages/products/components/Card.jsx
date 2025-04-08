import React from "react";
import { addToCart } from "../../../redux/slices/cart";
import { useDispatch } from "react-redux";
import Rating from "./Rating";

const Card = (data) => {
  const dispatch = useDispatch();
  const { image, title, price, description, id, rating, index } = data;
  const addtoCartFn = () => {
    dispatch(addToCart({ image, price, id, title }));
  };
  console.log(rating.rate);
  return (
    <div className="flex flex-col bg-[#D9D7B6] min-w-[200px] w-full max-w-[500px] shadow-md hover:shadow-xl rounded-lg p-2 m-2">
      <div className="bg-white overflow-hidden flex gap-2 ">
        <div className="bg-transparent min-w-[50%] py-2 justify-center flex">
          <img
            className="max-w-[200px] h-40 object-contain bg-white filter color-burn pl-3"
            src={image}
            alt={title}
          />
        </div>
        <div className="flex flex-col w-[50%] p-2 pr-4">
          <h1 className="text-sm text-black font-bold pt-2 text-nowrap overflow-ellipsis overflow-hidden">
            {title}
          </h1>
          <Rating index={index} rating={rating.rate} />
          {/* <p className="text-xs text-black">{description}</p> */}
          <div className="mt-auto ml-auto flex gap-2 items-center">
            <span className="content-center text-black text-xl font-bold">
              ${price}
            </span>
            <button
              className="bg-[#878672] p-2 hover:bg-[#545333] text-white cursor-pointer w-[100px] rounded-md ml-auto "
              onClick={addtoCartFn}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {/* <div className="flex bg-white mt-auto h-[40px] justify-between items-center"></div> */}
    </div>
  );
};

export default Card;
