import React from "react";

const Card = (data) => {
  console.log(data);
  const { image, title, price, description } = data;
  return (
    <div className="bg-gray-200 min-w-[100px] max-w-[300px] overflow-hidden flex flex-col gap-2  rounded-lg ">
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
      <div className="bg-gray-400 mt-auto h-[40px]">
        <span className="text-sm h-full">${price}</span>
        <button className="float-right bg-gray-800 h-full">Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;
