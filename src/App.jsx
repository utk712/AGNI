import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import ComboOffer from "./pages/ComboOffer";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import WhatsappButton from "./components/WhatsappButton";
import CartDrawer from "./components/CartDrawer";
import CartToast from "./components/CartToast";

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/combo" element={<ComboOffer />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CartDrawer />
          <CartToast />
          <WhatsappButton />
        </BrowserRouter>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;