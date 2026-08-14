import { createContext, useContext, useState, useEffect } from "react";
import initialProducts from "../data/products";
import { fetchCloudStore, saveCloudStore } from "../services/cloudSync";

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

  // Customer Orders
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
          status: "Shipped",
          date: "2026-08-12",
          freeGift: true
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

  // Cross-Device Cloud Sync on Mount
  useEffect(() => {
    async function syncWithCloud() {
      const cloudData = await fetchCloudStore();
      if (cloudData) {
        if (cloudData.products && Array.isArray(cloudData.products)) {
          setProducts(cloudData.products);
          localStorage.setItem("agni_custom_products", JSON.stringify(cloudData.products));
        }
        if (cloudData.customerOrders && Array.isArray(cloudData.customerOrders)) {
          setCustomerOrders(cloudData.customerOrders);
          localStorage.setItem("agni_customer_orders", JSON.stringify(cloudData.customerOrders));
        }
        if (cloudData.expenses && Array.isArray(cloudData.expenses)) {
          setExpenses(cloudData.expenses);
          localStorage.setItem("agni_expenses", JSON.stringify(cloudData.expenses));
        }
      }
    }
    syncWithCloud();
  }, []);

  // Save changes to localStorage and Cloud
  const persistState = (newProds, newOrders, newExps) => {
    const dataToSave = {
      products: newProds || products,
      customerOrders: newOrders || customerOrders,
      expenses: newExps || expenses,
    };
    saveCloudStore(dataToSave);
  };

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

    const updated = [productToAdd, ...products];
    setProducts(updated);
    localStorage.setItem("agni_custom_products", JSON.stringify(updated));
    persistState(updated, customerOrders, expenses);
    return productToAdd;
  };

  const updateProduct = (id, updatedFields) => {
    const updated = products.map((p) => {
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
    });
    setProducts(updated);
    localStorage.setItem("agni_custom_products", JSON.stringify(updated));
    persistState(updated, customerOrders, expenses);
  };

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("agni_custom_products", JSON.stringify(updated));
    persistState(updated, customerOrders, expenses);
  };

  const resetDefaultProducts = () => {
    setProducts(initialProducts);
    localStorage.setItem("agni_custom_products", JSON.stringify(initialProducts));
    persistState(initialProducts, customerOrders, expenses);
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
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
      freeGift: orderData.freeGift || false,
    };

    const updatedOrders = [newOrder, ...customerOrders];
    setCustomerOrders(updatedOrders);
    localStorage.setItem("agni_customer_orders", JSON.stringify(updatedOrders));
    persistState(products, updatedOrders, expenses);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = customerOrders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setCustomerOrders(updatedOrders);
    localStorage.setItem("agni_customer_orders", JSON.stringify(updatedOrders));
    persistState(products, updatedOrders, expenses);
  };

  const deleteCustomerOrder = (orderId) => {
    const updatedOrders = customerOrders.filter((o) => o.id !== orderId);
    setCustomerOrders(updatedOrders);
    localStorage.setItem("agni_customer_orders", JSON.stringify(updatedOrders));
    persistState(products, updatedOrders, expenses);
  };

  const addExpense = (exp) => {
    const newExp = {
      ...exp,
      id: Date.now(),
      amount: Number(exp.amount) || 0,
      date: exp.date || new Date().toISOString().split("T")[0],
    };
    const updatedExpenses = [newExp, ...expenses];
    setExpenses(updatedExpenses);
    localStorage.setItem("agni_expenses", JSON.stringify(updatedExpenses));
    persistState(products, customerOrders, updatedExpenses);
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((e) => e.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem("agni_expenses", JSON.stringify(updatedExpenses));
    persistState(products, customerOrders, updatedExpenses);
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
