import React from "react";

const Filter = () => {
  return (
    <div className="flex min-w-60 border flex-col">
      <p className="text-xl font-bold">Filters</p>
      <ul>
        <li>
          <input type="checkbox" /> Gender
        </li>
        <li>
          <input type="checkbox" /> Gender
        </li>
        <li>
          <input type="checkbox" /> Mens
        </li>
        <li>
          <input type="checkbox" /> Mens
        </li>
      </ul>
    </div>
  );
};

export default Filter;
