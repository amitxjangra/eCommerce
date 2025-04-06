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
      <aside className="min-w-[200px] h-screen bg-gray-700">
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
      </aside>
      <main className="flex-auto overflow-hidden">
        <nav className="justify-end flex p-2 gap-10">
          <label className="flex bg-gray-800 items-center pr-2 relative">
            <input
              type="search"
              className="bg-gray-800 focus:outline-none px-2 text-sm font-[300]"
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
              <div className="absolute w-full top-10 rounded bg-gray-800">
                {filteredProducts.map((i) => i.title)}
              </div>
            )}
          </label>
          {/* <DropMenu /> */}
          <button
            onClick={() => setCartOpen((prev) => !prev)}
            className="border p-1 rounded-full hover:cursor-pointer hover:bg-gray-700 hover:border-none hover:m-[1px]"
          >
            <Cart />
          </button>
        </nav>
        <div className="flex flex-col h-full overflow-hidden px-4 py-2">
          <Outlet />
        </div>
      </main>
      {cartOpen && (
        <div className="fixed right-0 top-0 w-100 h-screen bg-gray-700 shadow-lg p-4">
          <div className="flex  gap-5">
            <button onClick={() => setCartOpen(false)} className="text-black">
              X
            </button>
            <p className="text-black">Cart</p>
          </div>
          <div className="bg-black w-full h-[1px] mt-2" />
          <div className="flex flex-col gap-2 mt-2 overflow-auto h-[calc(100vh-200px)]">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center bg-gray-200">
                <img src={item.image} alt={item.title} className="w-16 h-16" />
                <div className="flex flex-col gap-2 ml-3">
                  <span className="text-black">{item.title}</span>
                  <span className="text-black">${item.price}</span>
                </div>
                <button
                  className="text-black ml-auto mr-4"
                  onClick={() => handleRemove(item)}
                >
                  -
                </button>
                <div className="text-black">{item.quantity}</div>

                <button
                  className="text-black ml-auto mr-4"
                  onClick={() => handleAdd(item)}
                >
                  +
                </button>
              </div>
            ))}
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
