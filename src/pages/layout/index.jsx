import React from "react";
import { Outlet } from "react-router-dom";
import PopMenu from "../../components/PopMenu";

const Layout = () => {
  return (
    <div className="flex">
      <aside className="min-w-[200px] h-screen bg-gray-700">
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
        <div>Home</div>
      </aside>
      <main className="flex-auto overflow-hidden">
        <nav>
          {/* <PopMenu content={"sass"} /> */}
          Cart
        </nav>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
