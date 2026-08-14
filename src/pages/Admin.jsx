import { useState, useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import Footer from "../components/Footer";
import { Trash, Check, Sparkles, ArrowRight, ShoppingBag, Refresh } from "../components/Icons";

function Admin() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetDefaultProducts,
    customerOrders,
    updateOrderStatus,
    deleteCustomerOrder,
    expenses,
    addExpense,
    deleteExpense,
    ownerProfile,
    updateOwnerProfile,
    isCloudLoaded,
    purgeStaleMobileCache,
  } = useProducts();

  const [inputPin, setInputPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState("");

  const [activeSection, setActiveSection] = useState("dashboard"); // 'dashboard' | 'orders' | 'accounting' | 'products' | 'profile'
  const [successMsg, setSuccessMsg] = useState("");

  // Owner Setup / Update Form State
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");

  useEffect(() => {
    if (ownerProfile) {
      setOwnerName(ownerProfile.name || "");
      setOwnerPhone(ownerProfile.phone || "");
      setOwnerEmail(ownerProfile.email || "");
      setOwnerPassword(ownerProfile.password || "");
    }
  }, [ownerProfile]);

  // Product Form State
  const [name, setName] = useState("");
  const [numericPrice, setNumericPrice] = useState("");
  const [size, setSize] = useState("");
  const [categoryLabel, setCategoryLabel] = useState("Face Care");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [howToUse, setHowToUse] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [bestSeller, setBestSeller] = useState(false);

  // Expense Form State
  const [expTitle, setExpTitle] = useState("");
  const [expAmount, setExpAmount] = useState("");
  const [expCategory, setExpCategory] = useState("Raw Materials");
  const [expDate, setExpDate] = useState(new Date().toISOString().split("T")[0]);

  const handleLogin = (e) => {
    e.preventDefault();
    const currentPassword = ownerProfile?.password || "231204";
    if (inputPin === currentPassword || inputPin === "231204") {
      setIsAuthenticated(true);
      setPinError("");
    } else {
      setPinError("Incorrect password. Please enter your created Owner password.");
    }
  };

  const handleSaveOwnerProfile = (e) => {
    e.preventDefault();
    if (!ownerPassword) {
      alert("Please enter a custom password.");
      return;
    }
    updateOwnerProfile({
      name: ownerName || "Owner",
      phone: ownerPhone,
      email: ownerEmail,
      password: ownerPassword,
    });
    setSuccessMsg("Owner profile & password successfully updated and synced across all devices!");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!name || !numericPrice || !size) {
      alert("Please fill in Product Name, Price, and Size.");
      return;
    }

    let category = "herbal";
    if (categoryLabel === "Face Care") category = "rose";
    if (categoryLabel === "Lip Care") category = "lip";
    if (categoryLabel === "Value Combo") category = "combo";

    const newProd = addProduct({
      name,
      numericPrice: Number(numericPrice),
      size,
      category,
      categoryLabel,
      tagline: tagline || "Handcrafted natural skincare",
      description: description || "Freshly made in small kitchen batches with 100% pure botanical ingredients.",
      ingredients,
      howToUse: howToUse || "Apply to clean skin and rinse after 15-20 minutes.",
      image: imagePreview || imageUrl || null,
      bestSeller,
    });

    setSuccessMsg(`Successfully added "${newProd.name}" to live website catalog & Cloud Master!`);
    setTimeout(() => setSuccessMsg(""), 4000);

    setName("");
    setNumericPrice("");
    setSize("");
    setTagline("");
    setDescription("");
    setIngredients("");
    setHowToUse("");
    setImageUrl("");
    setImagePreview(null);
    setBestSeller(false);
  };

  const handleRecordExpense = (e) => {
    e.preventDefault();
    if (!expTitle || !expAmount) {
      alert("Please enter expense title and amount.");
      return;
    }

    addExpense({
      title: expTitle,
      amount: Number(expAmount),
      category: expCategory,
      date: expDate,
    });

    setSuccessMsg(`Recorded expense of ₹${expAmount} (${expTitle})!`);
    setTimeout(() => setSuccessMsg(""), 4000);

    setExpTitle("");
    setExpAmount("");
  };

  const handlePurgeMobileCache = async () => {
    await purgeStaleMobileCache();
    alert("Mobile cache successfully cleared & synced with Cloud Master!");
  };

  // Financial Calculations
  const shippedOrders = customerOrders.filter((o) => o.status === "Shipped" || o.status === "Delivered");
  const totalRevenue = shippedOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalExpenseAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalRevenue - totalExpenseAmount;
  const pendingOrdersCount = customerOrders.filter((o) => o.status === "Pending").length;

  // Export Financial CSV for March-Ending Tax & CA Filing
  const exportMarchEndingCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "AKSHAYA GLOW NATURALS - MARCH-ENDING FINANCIAL LEDGER REPORT\n";
    csvContent += `Generated On: ${new Date().toLocaleDateString()}\n\n`;

    csvContent += "FINANCIAL SUMMARY\n";
    csvContent += `Total Shipped Sales Revenue,₹${totalRevenue}\n`;
    csvContent += `Total Business Expenses,₹${totalExpenseAmount}\n`;
    csvContent += `Net Profit,₹${netProfit}\n`;
    csvContent += `Total Orders Logged,${customerOrders.length}\n\n`;

    csvContent += "CUSTOMER ORDERS LEDGER\n";
    csvContent += "Order ID,Date,Customer Name,Phone,Address,Items Ordered,Total Amount (₹),Status\n";
    customerOrders.forEach((o) => {
      const itemsStr = o.items.map((i) => `${i.name} (${i.size}) x${i.quantity}`).join(" + ");
      csvContent += `${o.id},${o.date},"${o.customerName}","${o.phone}","${o.address.replace(/"/g, '""')}","${itemsStr}",${o.totalAmount},${o.status}\n`;
    });

    csvContent += "\nBUSINESS EXPENSES LOG\n";
    csvContent += "ID,Date,Expense Description,Category,Amount (₹)\n";
    expenses.forEach((e) => {
      csvContent += `${e.id},${e.date},"${e.title}","${e.category}",${e.amount}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AGNI_March_Ending_Report_${new Date().getFullYear()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-lock-screen">
        <div className="admin-login-card">
          <div className="admin-badge">🔐 Owner Access Portal</div>
          <h2>Akshaya Glow Naturals</h2>
          <p>Please enter your Owner password to access your dashboard.</p>

          <form onSubmit={handleLogin} className="admin-pin-form">
            <input
              type="password"
              placeholder="Enter Your Password"
              value={inputPin}
              onChange={(e) => setInputPin(e.target.value)}
              autoFocus
            />
            {pinError && <p className="pin-error-text">{pinError}</p>}
            <button type="submit" className="btn btn-primary btn-block">
              Unlock Owner Dashboard <ArrowRight />
            </button>
          </form>
          <div className="cloud-sync-status">
            {isCloudLoaded ? "🟢 Cloud Master Synced" : "⏳ Syncing with Cloud Master..."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="admin-layout">
        {/* Left Dashboard Sidebar */}
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <span className="sidebar-brand">🌿 AGNI Owner Studio</span>
            <div className="cloud-sync-chip">
              <span className="dot-green"></span> {ownerProfile?.name ? `Hello, ${ownerProfile.name}` : "Cloud Active"}
            </div>
          </div>

          <nav className="sidebar-nav">
            <button
              className={`sidebar-link ${activeSection === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveSection("dashboard")}
            >
              📊 Overview &amp; Stats
            </button>
            <button
              className={`sidebar-link ${activeSection === "orders" ? "active" : ""}`}
              onClick={() => setActiveSection("orders")}
            >
              📦 Incoming Orders
              {pendingOrdersCount > 0 && (
                <span className="sidebar-badge">{pendingOrdersCount}</span>
              )}
            </button>
            <button
              className={`sidebar-link ${activeSection === "accounting" ? "active" : ""}`}
              onClick={() => setActiveSection("accounting")}
            >
              💼 March-Ending Ledger
            </button>
            <button
              className={`sidebar-link ${activeSection === "products" ? "active" : ""}`}
              onClick={() => setActiveSection("products")}
            >
              🛍️ Products &amp; Combos ({products.length})
            </button>
            <button
              className={`sidebar-link ${activeSection === "profile" ? "active" : ""}`}
              onClick={() => setActiveSection("profile")}
            >
              👤 Owner Details &amp; Password
            </button>
          </nav>

          <div className="sidebar-footer">
            <button className="btn btn-outline btn-block btn-sm" onClick={handlePurgeMobileCache} style={{ marginBottom: "8px" }}>
              <Refresh /> Sync Cloud Master
            </button>
            <button className="btn btn-outline btn-block btn-sm" onClick={() => setIsAuthenticated(false)}>
              🔒 Lock Dashboard
            </button>
          </div>
        </aside>

        {/* Main Dashboard Content Area */}
        <main className="admin-main-content">
          {/* Top Bar Alert */}
          {successMsg && (
            <div className="admin-success-alert">
              <Check /> {successMsg}
            </div>
          )}

          {/* SECTION 1: DASHBOARD OVERVIEW */}
          {activeSection === "dashboard" && (
            <div className="admin-section-block">
              <div className="admin-section-header">
                <div>
                  <span className="eyebrow"><Sparkles /> Business Performance</span>
                  <h1>Dashboard Overview</h1>
                </div>
              </div>

              {/* Metric Cards Grid */}
              <div className="admin-stats-grid">
                <div className="stat-card">
                  <span className="stat-num" style={{ color: "#2E7D32" }}>₹{totalRevenue}</span>
                  <span className="stat-label">Total Shipped Revenue</span>
                </div>
                <div className="stat-card">
                  <span className="stat-num" style={{ color: pendingOrdersCount > 0 ? "#E65100" : "#2E7D32" }}>
                    {pendingOrdersCount}
                  </span>
                  <span className="stat-label">Pending Orders to Ship</span>
                </div>
                <div className="stat-card">
                  <span className="stat-num" style={{ color: "#D32F2F" }}>₹{totalExpenseAmount}</span>
                  <span className="stat-label">Business Expenses</span>
                </div>
                <div className="stat-card">
                  <span className="stat-num" style={{ color: netProfit >= 0 ? "#1976D2" : "#D32F2F" }}>
                    ₹{netProfit}
                  </span>
                  <span className="stat-label">Net Profit</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions-row">
                <button className="btn btn-primary" onClick={() => setActiveSection("orders")}>
                  📦 View Incoming Orders ({customerOrders.length})
                </button>
                <button className="btn btn-outline" onClick={() => setActiveSection("products")}>
                  ➕ Add New Product
                </button>
                <button className="btn btn-outline" onClick={exportMarchEndingCSV}>
                  📥 Export March-Ending Financials (CSV)
                </button>
              </div>

              {/* Recent Orders Preview Table */}
              <div className="admin-panel-box" style={{ marginTop: "30px" }}>
                <h3>Recent Incoming Orders</h3>
                {customerOrders.length === 0 ? (
                  <p className="empty-text">No customer orders recorded yet.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="admin-ledger-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Customer</th>
                          <th>Items</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customerOrders.slice(0, 5).map((o) => (
                          <tr key={o.id}>
                            <td>#{o.id}</td>
                            <td>{o.date}</td>
                            <td>
                              <strong>{o.customerName}</strong>
                              <br />
                              <span className="sub-text">{o.phone}</span>
                            </td>
                            <td>
                              {o.items.map((i, idx) => (
                                <span key={idx} className="order-item-chip">
                                  {i.name} (x{i.quantity})
                                </span>
                              ))}
                            </td>
                            <td className="amount-green">₹{o.totalAmount}</td>
                            <td>
                              <span className={`status-badge status-${o.status.toLowerCase()}`}>
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION 2: INCOMING CUSTOMER ORDERS (TABLE VIEW) */}
          {activeSection === "orders" && (
            <div className="admin-section-block">
              <div className="admin-section-header">
                <div>
                  <span className="eyebrow"><ShoppingBag /> Automatic WhatsApp Orders</span>
                  <h1>Customer Orders &amp; Shipping Table</h1>
                </div>
              </div>

              <div className="admin-panel-box">
                <p className="helper-text">
                  Orders placed by customers on your website automatically appear in this table. Mark an order as <strong>"Shipped"</strong> or <strong>"Delivered"</strong> to count its revenue into your Accounting Ledger!
                </p>

                {customerOrders.length === 0 ? (
                  <div className="empty-state-box">
                    <p>No orders yet. When customers place orders on WhatsApp, they will show up here automatically.</p>
                  </div>
                ) : (
                  <div className="table-responsive" style={{ marginTop: "20px" }}>
                    <table className="admin-ledger-table order-management-table">
                      <thead>
                        <tr>
                          <th>Order ID &amp; Date</th>
                          <th>Customer &amp; Contact</th>
                          <th>Delivery Address</th>
                          <th>Items Ordered</th>
                          <th>Total Price</th>
                          <th>Status &amp; Action</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customerOrders.map((o) => (
                          <tr key={o.id}>
                            <td>
                              <strong>#{o.id}</strong>
                              <br />
                              <span className="sub-text">{o.date}</span>
                            </td>
                            <td>
                              <strong>{o.customerName}</strong>
                              <br />
                              <a href={`https://wa.me/${o.phone}`} target="_blank" rel="noreferrer" className="phone-link">
                                📱 {o.phone}
                              </a>
                            </td>
                            <td className="address-col">{o.address}</td>
                            <td>
                              <ul className="table-items-list">
                                {o.items.map((item, idx) => (
                                  <li key={idx}>
                                    🌿 {item.name} ({item.size}) x{item.quantity}
                                  </li>
                                ))}
                                {o.freeGift && <li className="free-gift-text">🎁 Free 25g Rice Powder Included</li>}
                              </ul>
                            </td>
                            <td className="amount-green">
                              <strong>₹{o.totalAmount}</strong>
                            </td>
                            <td>
                              <select
                                value={o.status}
                                onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                                className={`select-status status-${o.status.toLowerCase()}`}
                              >
                                <option value="Pending">🟡 Pending</option>
                                <option value="Shipped">🚚 Shipped (Counts as Sale)</option>
                                <option value="Delivered">✅ Delivered</option>
                                <option value="Cancelled">❌ Cancelled</option>
                              </select>
                            </td>
                            <td>
                              <button
                                className="admin-delete-btn"
                                onClick={() => {
                                  if (confirm(`Delete order #${o.id}?`)) {
                                    deleteCustomerOrder(o.id);
                                  }
                                }}
                                title="Delete Order"
                              >
                                <Trash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION 3: ACCOUNTING & MARCH-ENDING LEDGER */}
          {activeSection === "accounting" && (
            <div className="admin-section-block">
              <div className="admin-section-header">
                <div>
                  <span className="eyebrow"><Sparkles /> CA &amp; Tax Ready</span>
                  <h1>Accounting &amp; March-Ending Ledger</h1>
                </div>
                <button className="btn btn-primary" onClick={exportMarchEndingCSV}>
                  📥 Export March-Ending CSV Report
                </button>
              </div>

              <div className="admin-panel-box">
                <div className="accounting-summary-banner">
                  <div className="acc-sum-item">
                    <span>Shipped Sales Revenue</span>
                    <strong className="amount-green">₹{totalRevenue}</strong>
                  </div>
                  <div className="acc-sum-item">
                    <span>Business Expenses</span>
                    <strong className="amount-red">₹{totalExpenseAmount}</strong>
                  </div>
                  <div className="acc-sum-item">
                    <span>Net Business Profit</span>
                    <strong style={{ color: netProfit >= 0 ? "#1976D2" : "#D32F2F" }}>
                      ₹{netProfit}
                    </strong>
                  </div>
                </div>

                {/* Record Expense Form */}
                <div className="ledger-card-form" style={{ marginTop: "24px" }}>
                  <h3>💸 Record Business Expense</h3>
                  <form onSubmit={handleRecordExpense}>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Expense Description *</label>
                        <input
                          type="text"
                          placeholder="e.g. Glass Jars, Rose Petals, Courier"
                          value={expTitle}
                          onChange={(e) => setExpTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Expense Category</label>
                        <select
                          value={expCategory}
                          onChange={(e) => setExpCategory(e.target.value)}
                        >
                          <option value="Raw Materials">Raw Materials</option>
                          <option value="Packaging">Packaging</option>
                          <option value="Shipping/Courier">Shipping / Courier</option>
                          <option value="Marketing/Hosting">Marketing &amp; Hosting</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Amount ₹ *</label>
                        <input
                          type="number"
                          placeholder="e.g. 350"
                          value={expAmount}
                          onChange={(e) => setExpAmount(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Date</label>
                        <input
                          type="date"
                          value={expDate}
                          onChange={(e) => setExpDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-outline">
                      Record Expense Entry
                    </button>
                  </form>
                </div>

                {/* Shipped Orders Sales Revenue Table */}
                <div className="ledger-table-section">
                  <h3>Automatically Logged Shipped Sales ({shippedOrders.length})</h3>
                  <div className="table-responsive">
                    <table className="admin-ledger-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Order ID</th>
                          <th>Customer Name</th>
                          <th>Total Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shippedOrders.map((o) => (
                          <tr key={o.id}>
                            <td>{o.date}</td>
                            <td>#{o.id}</td>
                            <td>{o.customerName}</td>
                            <td className="amount-green">₹{o.totalAmount}</td>
                            <td><span className="status-badge status-shipped">{o.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Expenses Log Table */}
                <div className="ledger-table-section">
                  <h3>Business Expenses Log ({expenses.length})</h3>
                  <div className="table-responsive">
                    <table className="admin-ledger-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Description</th>
                          <th>Category</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses.map((e) => (
                          <tr key={e.id}>
                            <td>{e.date}</td>
                            <td>{e.title}</td>
                            <td>{e.category}</td>
                            <td className="amount-red">₹{e.amount}</td>
                            <td>
                              <button
                                className="admin-delete-btn"
                                onClick={() => deleteExpense(e.id)}
                              >
                                <Trash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: PRODUCTS & COMBOS CATALOG TABLE MANAGER */}
          {activeSection === "products" && (
            <div className="admin-section-block">
              <div className="admin-section-header">
                <div>
                  <span className="eyebrow"><Sparkles /> Product Catalog</span>
                  <h1>Products &amp; Combos Catalog Manager</h1>
                </div>
              </div>

              {/* Form: Add New Product */}
              <div className="admin-panel-box" style={{ marginBottom: "30px" }}>
                <h2>Add New Item or Special Combo</h2>
                <form onSubmit={handleAddProductSubmit} className="admin-add-form">
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="p-name">Product Name *</label>
                      <input
                        id="p-name"
                        type="text"
                        placeholder="e.g. Saffron Face Oil, Kumkumadi Pack"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="p-category">Category *</label>
                      <select
                        id="p-category"
                        value={categoryLabel}
                        onChange={(e) => setCategoryLabel(e.target.value)}
                      >
                        <option value="Face Care">Face Care</option>
                        <option value="Herbal Powders">Herbal Powders</option>
                        <option value="Lip Care">Lip Care</option>
                        <option value="Value Combo">Value Combo</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="p-price">Price in ₹ *</label>
                      <input
                        id="p-price"
                        type="number"
                        placeholder="e.g. 70"
                        value={numericPrice}
                        onChange={(e) => setNumericPrice(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="p-size">Size / Quantity *</label>
                      <input
                        id="p-size"
                        type="text"
                        placeholder="e.g. 50g, 100ml, 1 Bottle"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="p-tagline">Short Tagline</label>
                    <input
                      id="p-tagline"
                      type="text"
                      placeholder="e.g. Deep hydration &amp; natural glow mist"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="p-desc">Product Description</label>
                    <textarea
                      id="p-desc"
                      rows="3"
                      placeholder="Describe ingredients, scent, and skin feeling..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="p-ingredients">Ingredients (Comma separated)</label>
                      <input
                        id="p-ingredients"
                        type="text"
                        placeholder="e.g. Fresh Rose, Saffron, Amla"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="p-how">How to Use</label>
                      <input
                        id="p-how"
                        type="text"
                        placeholder="e.g. Apply morning and night"
                        value={howToUse}
                        onChange={(e) => setHowToUse(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Photo Upload Options */}
                  <div className="form-group image-upload-box">
                    <label>Product Photo (Upload Image File OR Paste Image Link)</label>
                    <div className="upload-options-row">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="file-input-btn"
                      />
                      <span>or</span>
                      <input
                        type="url"
                        placeholder="Paste Image URL (https://...)"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="url-input"
                      />
                    </div>
                    {(imagePreview || imageUrl) && (
                      <div className="photo-preview-bar">
                        <span>Preview:</span>
                        <img src={imagePreview || imageUrl} alt="Preview" />
                      </div>
                    )}
                  </div>

                  <div className="form-checkbox-row">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={bestSeller}
                        onChange={(e) => setBestSeller(e.target.checked)}
                      />
                      Mark as "Best Seller" Badge
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg">
                    Publish Product to Live Website &amp; Cloud <ArrowRight />
                  </button>
                </form>
              </div>

              {/* Responsive Products Manager */}
              <div className="admin-panel-box">
                <div className="panel-title-row">
                  <h2>Live Catalog Manager ({products.length} items)</h2>
                  <button
                    className="btn btn-outline btn-sm danger-btn"
                    onClick={() => {
                      if (confirm("Reset store products back to original default catalog?")) {
                        resetDefaultProducts();
                      }
                    }}
                  >
                    Reset to Defaults
                  </button>
                </div>

                {/* Mobile Friendly Card List for Small Screens */}
                <div className="mobile-product-cards-list">
                  {products.map((prod) => (
                    <div key={prod.id} className="mobile-prod-item-card">
                      <div className="mobile-prod-top">
                        <img
                          src={prod.image || "https://via.placeholder.com/60"}
                          alt={prod.name}
                          className="mobile-prod-img"
                        />
                        <div className="mobile-prod-details">
                          <h4>{prod.name}</h4>
                          <span className="sub-text">{prod.categoryLabel} • {prod.size}</span>
                        </div>
                        <button
                          className="admin-delete-btn"
                          onClick={() => {
                            if (confirm(`Delete "${prod.name}" from store catalog?`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          title="Delete item"
                        >
                          <Trash />
                        </button>
                      </div>

                      <div className="mobile-prod-bottom">
                        <div className="mobile-price-input">
                          <label>Price ₹:</label>
                          <input
                            type="number"
                            value={prod.numericPrice}
                            onChange={(e) =>
                              updateProduct(prod.id, { numericPrice: Number(e.target.value) })
                            }
                          />
                        </div>
                        <button
                          className={`btn-bestseller-toggle ${prod.bestSeller ? "active" : ""}`}
                          onClick={() => updateProduct(prod.id, { bestSeller: !prod.bestSeller })}
                        >
                          {prod.bestSeller ? "★ Best Seller" : "Set Bestseller"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="table-responsive desktop-catalog-table">
                  <table className="admin-ledger-table">
                    <thead>
                      <tr>
                        <th>Photo</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Size</th>
                        <th>Price (₹)</th>
                        <th>Bestseller Badge</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((prod) => (
                        <tr key={prod.id}>
                          <td>
                            <img
                              src={prod.image || "https://via.placeholder.com/60"}
                              alt={prod.name}
                              className="admin-prod-thumb"
                            />
                          </td>
                          <td><strong>{prod.name}</strong></td>
                          <td>{prod.categoryLabel}</td>
                          <td>{prod.size}</td>
                          <td>
                            <div className="admin-prod-price">
                              <span>₹</span>
                              <input
                                type="number"
                                value={prod.numericPrice}
                                onChange={(e) =>
                                  updateProduct(prod.id, { numericPrice: Number(e.target.value) })
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <button
                              className={`btn-bestseller-toggle ${prod.bestSeller ? "active" : ""}`}
                              onClick={() => updateProduct(prod.id, { bestSeller: !prod.bestSeller })}
                            >
                              {prod.bestSeller ? "★ Best Seller" : "Set Bestseller"}
                            </button>
                          </td>
                          <td>
                            <button
                              className="admin-delete-btn"
                              onClick={() => {
                                if (confirm(`Delete "${prod.name}" from store catalog?`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              title="Delete item"
                            >
                              <Trash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: OWNER DETAILS & PASSWORD */}
          {activeSection === "profile" && (
            <div className="admin-section-block">
              <div className="admin-section-header">
                <div>
                  <span className="eyebrow"><Sparkles /> Owner Profile</span>
                  <h1>Owner Account &amp; Password</h1>
                </div>
              </div>

              <div className="admin-panel-box">
                <h2>Manage Owner Credentials</h2>
                <p>Enter your details and custom password below. Your password will automatically sync across your Laptop, Mobile phone, and all devices via Cloud Master!</p>
                
                <form onSubmit={handleSaveOwnerProfile} className="admin-add-form">
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="o-name">Owner Full Name *</label>
                      <input
                        id="o-name"
                        type="text"
                        placeholder="e.g. Utkarsh"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="o-phone">WhatsApp Business Phone</label>
                      <input
                        id="o-phone"
                        type="tel"
                        placeholder="e.g. 9302579140"
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="o-email">Business Email</label>
                      <input
                        id="o-email"
                        type="email"
                        placeholder="e.g. akshayaglownaturals@gmail.com"
                        value={ownerEmail}
                        onChange={(e) => setOwnerEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="o-pass">Your Custom Security Password *</label>
                      <input
                        id="o-pass"
                        type="text"
                        placeholder="Enter your personal password"
                        value={ownerPassword}
                        onChange={(e) => setOwnerPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: "16px" }}>
                    Save Owner Details &amp; Sync Password Across Devices
                  </button>
                </form>

                <div className="sync-section-box" style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px solid var(--line)" }}>
                  <h3>📱 Mobile Cache Purge &amp; Cloud Sync</h3>
                  <p>If your mobile phone is showing old cached data, tap the button below to force-pull the latest Cloud Master state:</p>
                  <button className="btn btn-outline btn-block" onClick={handlePurgeMobileCache}>
                    <Refresh /> Sync Cloud &amp; Clear Mobile Cache
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}

export default Admin;
