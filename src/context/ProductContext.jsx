import { createContext, useContext, useState, useEffect } from "react";
import initialProducts from "../data/products";
import { fetchCloudStore, saveCloudStore } from "../services/cloudSync";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [adminPin, setAdminPin] = useState("1234");
  const [isCloudLoaded, setIsCloudLoaded] = useState(false);

  // Load from local storage cache initially
  useEffect(() => {
    try {
      const savedProds = localStorage.getItem("agni_custom_products");
      if (savedProds) {
        const parsed = JSON.parse(savedProds);
        if (Array.isArray(parsed) && parsed.length > 0) setProducts(parsed);
      }
      const savedOrders = localStorage.getItem("agni_customer_orders");
      if (savedOrders) setCustomerOrders(JSON.parse(savedOrders));

      const savedExps = localStorage.getItem("agni_expenses");
      if (savedExps) setExpenses(JSON.parse(savedExps));

      const savedPin = localStorage.getItem("agni_admin_pin");
      if (savedPin) setAdminPin(savedPin);
    } catch (e) {
      console.error("Local storage load error", e);
    }
  }, []);

  // Fetch Cloud Master state (Prioritized over stale mobile cache)
  useEffect(() => {
    async function syncWithCloudMaster() {
      const cloudData = await fetchCloudStore();
      if (cloudData && typeof cloudData === "object") {
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
        if (cloudData.adminPin) {
          setAdminPin(cloudData.adminPin);
          localStorage.setItem("agni_admin_pin", cloudData.adminPin);
        }
      }
      setIsCloudLoaded(true);
    }
    syncWithCloudMaster();
  }, []);

  // Helper to persist all data to Cloud Master
  const persistState = (newProds, newOrders, newExps, newPin) => {
    const dataToSave = {
      products: newProds !== undefined ? newProds : products,
      customerOrders: newOrders !== undefined ? newOrders : customerOrders,
      expenses: newExps !== undefined ? newExps : expenses,
      adminPin: newPin !== undefined ? newPin : adminPin,
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
    persistState(updated, customerOrders, expenses, adminPin);
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
    persistState(updated, customerOrders, expenses, adminPin);
  };

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("agni_custom_products", JSON.stringify(updated));
    persistState(updated, customerOrders, expenses, adminPin);
  };

  const resetDefaultProducts = () => {
    setProducts(initialProducts);
    localStorage.setItem("agni_custom_products", JSON.stringify(initialProducts));
    persistState(initialProducts, customerOrders, expenses, adminPin);
  };

  const updateAdminPin = (newPin) => {
    setAdminPin(newPin);
    localStorage.setItem("agni_admin_pin", newPin);
    persistState(products, customerOrders, expenses, newPin);
  };

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
    persistState(products, updatedOrders, expenses, adminPin);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = customerOrders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setCustomerOrders(updatedOrders);
    localStorage.setItem("agni_customer_orders", JSON.stringify(updatedOrders));
    persistState(products, updatedOrders, expenses, adminPin);
  };

  const deleteCustomerOrder = (orderId) => {
    const updatedOrders = customerOrders.filter((o) => o.id !== orderId);
    setCustomerOrders(updatedOrders);
    localStorage.setItem("agni_customer_orders", JSON.stringify(updatedOrders));
    persistState(products, updatedOrders, expenses, adminPin);
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
    persistState(products, customerOrders, updatedExpenses, adminPin);
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((e) => e.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem("agni_expenses", JSON.stringify(updatedExpenses));
    persistState(products, customerOrders, updatedExpenses, adminPin);
  };

  const purgeStaleMobileCache = async () => {
    localStorage.clear();
    const cloudData = await fetchCloudStore();
    if (cloudData) {
      if (cloudData.products) setProducts(cloudData.products);
      if (cloudData.customerOrders) setCustomerOrders(cloudData.customerOrders);
      if (cloudData.expenses) setExpenses(cloudData.expenses);
      if (cloudData.adminPin) setAdminPin(cloudData.adminPin);
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
        customerOrders,
        createCustomerOrder,
        updateOrderStatus,
        deleteCustomerOrder,
        expenses,
        addExpense,
        deleteExpense,
        isCloudLoaded,
        purgeStaleMobileCache,
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
