import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Kart from "./pages/Kart";

export default function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/kart" element={<Kart />} />
      </Route>
    </Routes>
  );
}
