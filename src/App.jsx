import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./pages/layout";
import Login from "./pages/login";
import Products from "./pages/products";

function App() {
  return (
    <BrowserRouter basename="/eCommerce/">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/products" element={<Layout />}>
          <Route index element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
