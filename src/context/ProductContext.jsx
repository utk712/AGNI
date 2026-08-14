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

  // Sales Orders Ledger
  const [salesOrders, setSalesOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("agni_sales_orders");
      return saved ? JSON.parse(saved) : [
        { id: 1, customerName: "Pooja Sharma", productName: "Rose Water (100ml)", quantity: 2, amount: 120, date: "2026-08-01", notes: "WhatsApp Order" },
        { id: 2, customerName: "Ananya R.", productName: "ABC Powder (100g)", quantity: 1, amount: 120, date: "2026-08-05", notes: "Combo Customer" },
        { id: 3, customerName: "Sneha P.", productName: "Beetroot Lip Balm", quantity: 3, amount: 120, date: "2026-08-10", notes: "Direct Sale" }
      ];
    } catch {
      return [];
    }
  });

  // Expenses Ledger
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem("agni_expenses");
      return saved ? JSON.parse(saved) : [
        { id: 1, title: "Raw Rose Petals & Distillation Jars", amount: 350, category: "Raw Materials", date: "2026-08-02" },
        { id: 2, title: "Eco-friendly Packaging Boxes & Labels", amount: 200, category: "Packaging", date: "2026-08-06" }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("agni_custom_products", JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem("agni_sales_orders", JSON.stringify(salesOrders));
    } catch (e) {
      console.error(e);
    }
  }, [salesOrders]);

  useEffect(() => {
    try {
      localStorage.setItem("agni_expenses", JSON.stringify(expenses));
    } catch (e) {
      console.error(e);
    }
  }, [expenses]);

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

  // Ledger functions
  const addSalesOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now(),
      amount: Number(order.amount) || 0,
      quantity: Number(order.quantity) || 1,
      date: order.date || new Date().toISOString().split("T")[0],
    };
    setSalesOrders((prev) => [newOrder, ...prev]);
  };

  const deleteSalesOrder = (id) => {
    setSalesOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const addExpense = (exp) => {
    const newExp = {
      ...exp,
      id: Date.now(),
      amount: Number(exp.amount) || 0,
      date: exp.date || new Date().toISOString().split("T")[0],
    };
    setExpenses((prev) => [newExp, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
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
        salesOrders,
        addSalesOrder,
        deleteSalesOrder,
        expenses,
        addExpense,
        deleteExpense,
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
