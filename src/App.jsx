import { Routes, Route, Router } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import DetailPage from "./pages/DetailPage";
import Cart from "./pages/Cart";
import { ProductsProvider } from "./contexts/ProductsContext";
import { CartProvider } from "./contexts/CartContext";




import CompletePage from "./pages/CompletePage";
import CheckoutForm from "./components/CheckoutForm";
import PaymentLayout from "./layouts/PaymentLayout";




export default function App() {



  return (
    <ProductsProvider>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<DetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={<PaymentLayout />}>
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/complete" element={<CompletePage />} />
          </Route>
        </Route>
      </Routes>
    </ProductsProvider>
  );
}
