import React, { useState, useMemo, useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import DropMenu from "../../components/DropMenu";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cart";
import Cart from "../../assets/Cart";
import Search from "../../assets/Search";
import useDebounce from "../../hooks/useDebounce";
import { searchAlgorithm } from "../../utils/searchAlgorithm";
import { saveAllProducts } from "../../redux/slices/products";
import { setSearch } from "../../redux/slices/search";

const Layout = () => {
  const [openSuggestion, setOpenSuggestion] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);
  const search = useSelector((state) => state.search);
  const handleRemove = (item) => {
    dispatch(removeFromCart(item.id));
  };

  const handleAdd = (item) => {
    dispatch(addToCart(item));
  };

  const filteredProducts = useMemo(() => {
    return searchAlgorithm(products, searchField);
  }, [products, searchField]);

  // useEffect(() => {
  //   if (search.length) {
  //     dispatch({
  //       type: "api/call",
  //       payload: {
  //         url: "/products",
  //         method: "GET",
  //         onSuccess: "products/saveAllProducts",
  //       },
  //     });
  //   }
  // }, [search]);
  console.log("openSuggestion", openSuggestion);
  return (
    <div className="flex">
      {/* <aside className="min-w-[200px] h-screen bg-gray-700">
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
      </aside> */}
      <main className="flex-auto overflow-hidden">
        <nav className="justify-end flex p-2 gap-10">
          <label className="flex w-100 bg-[#D9D7B6] rounded items-center pr-2 relative">
            <input
              type="search"
              className="bg-[#D9D7B6] focus:outline-none px-2 text-sm font-[300] w-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setOpenSuggestion(false);
                  setSearchField(e.target.value);
                  dispatch(setSearch(e.target.value));
                  dispatch(saveAllProducts(filteredProducts));
                }
              }}
              onFocus={() => {
                setOpenSuggestion(true);
              }}
              onBlur={() => {
                setOpenSuggestion(false);
              }}
              onChange={(e) => {
                if (!openSuggestion) setOpenSuggestion(true);
                setSearchField(e.target.value);
                if (!e?.target?.value) {
                  dispatch(setSearch(e.target.value));
                  dispatch({
                    type: "api/call",
                    payload: {
                      url: "/products",
                      method: "GET",
                      onSuccess: "products/saveAllProducts",
                    },
                  });
                }
              }}
            />
            <Search />
            {searchField && openSuggestion && (
              <div className="absolute w-full top-10 rounded bg-[#D9D7B6] p-2">
                {filteredProducts.map((i) => (
                  <div className="overflow-hidden text-nowrap text-ellipsis hover:bg-[#878672] hover:cursor-pointer hover:text-white p-2 rounded-md">
                    {i.title}
                  </div>
                ))}
              </div>
            )}
          </label>
          {/* <DropMenu /> */}
          <button
            onClick={() => setCartOpen((prev) => !prev)}
            className="border border-[#878672] bg-[#878672] p-1 rounded-full hover:cursor-pointer hover:bg-[#545333] hover:border-none hover:m-[1px]"
          >
            <Cart />
          </button>
        </nav>
        <div className="flex h-full overflow-hidden px-4 py-2">
          <Outlet />
        </div>
      </main>
      {cartOpen && (
        <div className="fixed bg-[#878672] right-0 top-0 w-150 h-screen shadow-lg p-4">
          <div className="flex  gap-5">
            <button onClick={() => setCartOpen(false)} className="text-black">
              X
            </button>
            <p className="text-black">Cart</p>
          </div>
          <div className="bg-black w-full h-[1px] mt-2" />
          <div className="flex flex-col gap-3 p-2 mt-2 overflow-auto h-[calc(100vh-120px)]">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex rounded items-center bg-white p-2"
              >
                <img src={item.image} alt={item.title} className="w-20 " />
                <div className="flex flex-col ml-3 w-full h-full">
                  <span className="text-black font-[400]">{item.title}</span>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="text-black">
                      ${item.price * item.quantity}
                    </span>
                    <button
                      className="text-black ml-auto mr-2"
                      onClick={() => handleRemove(item)}
                    >
                      -
                    </button>
                    <div className="text-black w-min">{item.quantity}</div>
                    <button
                      className="text-black  mr-4  flex items-center justify-center"
                      onClick={() => handleAdd(item)}
                    >
                      <span className="text-black text-">+</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {cartItems.length && (
              <div className="flex justify-between">
                <span className="text-xl">
                  Total: $
                  {cartItems?.reduce(
                    (acc, cur) => acc + cur.price * cur.quantity,
                    0
                  )}
                </span>
                <button className="flex border rounded-full px-12 py-1 hover:cursor-pointer hover:bg-[#FDFBD4]">
                  Checkout
                </button>
              </div>
            )}
            {cartItems.length === 0 && (
              <div className="text-center text-gray-500">Cart is empty</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
