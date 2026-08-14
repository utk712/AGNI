import { createContext, useContext, useState, useEffect } from "react";
import initialProducts from "../data/products";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("agni_custom_products");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error loading products from localStorage", e);
    }
    return initialProducts;
  });

  const [adminPin, setAdminPin] = useState(() => {
    try {
      return localStorage.getItem("agni_admin_pin") || "1234";
    } catch {
      return "1234";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("agni_custom_products", JSON.stringify(products));
    } catch (e) {
      console.error("Error saving products to localStorage", e);
    }
  }, [products]);

  const addProduct = (newProd) => {
    const id = Date.now();
    const productToAdd = {
      ...newProd,
      id,
      numericPrice: Number(newProd.numericPrice) || 0,
      price: `₹${newProd.numericPrice}`,
      ingredients: typeof newProd.ingredients === "string" 
        ? newProd.ingredients.split(",").map((s) => s.trim()).filter(Boolean)
        : newProd.ingredients || [],
    };

    setProducts((prev) => [productToAdd, ...prev]);
    return productToAdd;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const numericPrice = updatedFields.numericPrice !== undefined 
            ? Number(updatedFields.numericPrice) 
            : p.numericPrice;
          return {
            ...p,
            ...updatedFields,
            numericPrice,
            price: `₹${numericPrice}`,
          };
        }
        return p;
      })
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetDefaultProducts = () => {
    setProducts(initialProducts);
    try {
      localStorage.removeItem("agni_custom_products");
    } catch (e) {
      console.error(e);
    }
  };

  const updateAdminPin = (newPin) => {
    setAdminPin(newPin);
    try {
      localStorage.setItem("agni_admin_pin", newPin);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetDefaultProducts,
        adminPin,
        updateAdminPin,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
