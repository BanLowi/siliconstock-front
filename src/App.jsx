import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import DetailPage from "./pages/DetailPage";
import Cart from "./pages/Cart";
import { ProductsProvider } from "./contexts/ProductsContext";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  return (
    <CartProvider>
      <ProductsProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<DetailPage />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </ProductsProvider>
    </CartProvider>
  );
}
