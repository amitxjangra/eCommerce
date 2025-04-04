import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../redux/slices/counter";

const Counter = () => {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center gap-10">
      <span className="text-3xl">{count}</span>
      <div className="btn-grp">
        <button onClick={() => dispatch(decrement())}>Remove -</button>
        <button onClick={() => dispatch(increment())}>Add +</button>
      </div>
    </div>
  );
};

export default Counter;
