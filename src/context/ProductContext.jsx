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

  // Customer Orders (automatically created when customer orders via WhatsApp)
  const [customerOrders, setCustomerOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("agni_customer_orders");
      return saved ? JSON.parse(saved) : [
        {
          id: 101,
          customerName: "Ananya Sharma",
          phone: "9876543210",
          address: "Flat 402, Lotus Apartments, Hyderabad - 500081",
          items: [
            { name: "Rose Water", size: "100ml", quantity: 2, price: 60 },
            { name: "Beetroot Lip Balm", size: "20g", quantity: 1, price: 40 }
          ],
          subtotal: 160,
          totalAmount: 160,
          status: "Shipped", // Pending | Shipped | Delivered | Cancelled
          date: "2026-08-12",
          freeGift: true
        },
        {
          id: 102,
          customerName: "Rahul Verma",
          phone: "9123456789",
          address: "B-12, Sector 5, Gurgaon - 122001",
          items: [
            { name: "ABC Powder", size: "100g", quantity: 1, price: 120 }
          ],
          subtotal: 120,
          totalAmount: 160,
          status: "Pending",
          date: "2026-08-14",
          freeGift: false
        }
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
      localStorage.setItem("agni_customer_orders", JSON.stringify(customerOrders));
    } catch (e) {
      console.error(e);
    }
  }, [customerOrders]);

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

  // Automatic Order Creation from Cart Checkout
  const createCustomerOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      customerName: orderData.customerName || "Website Customer",
      phone: orderData.phone || "Not specified",
      address: orderData.address || "Share in chat",
      items: orderData.items || [],
      subtotal: orderData.subtotal || 0,
      totalAmount: orderData.totalAmount || orderData.subtotal || 0,
      status: "Pending", // Default new order status
      date: new Date().toISOString().split("T")[0],
      freeGift: orderData.freeGift || false,
    };

    setCustomerOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setCustomerOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const deleteCustomerOrder = (orderId) => {
    setCustomerOrders((prev) => prev.filter((o) => o.id !== orderId));
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
        customerOrders,
        createCustomerOrder,
        updateOrderStatus,
        deleteCustomerOrder,
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
