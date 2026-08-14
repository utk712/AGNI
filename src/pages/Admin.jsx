import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import Footer from "../components/Footer";
import { Trash, Check, Sparkles, ArrowRight } from "../components/Icons";

function Admin() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetDefaultProducts,
    adminPin,
    updateAdminPin,
  } = useProducts();

  const [inputPin, setInputPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState("");

  const [activeTab, setActiveTab] = useState("add"); // 'add' | 'manage' | 'pin'
  const [successMsg, setSuccessMsg] = useState("");

  // Form State
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

  // New PIN state
  const [newPinInput, setNewPinInput] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputPin === adminPin) {
      setIsAuthenticated(true);
      setPinError("");
    } else {
      setPinError("Incorrect Owner PIN code. Please try again.");
    }
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

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!name || !numericPrice || !size) {
      alert("Please fill in the Product Name, Price, and Size.");
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

    setSuccessMsg(`Successfully added "${newProd.name}" to live website catalog!`);
    setTimeout(() => setSuccessMsg(""), 4000);

    // Reset Form
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

  const handlePinChange = (e) => {
    e.preventDefault();
    if (newPinInput.length < 4) {
      alert("PIN code must be at least 4 digits.");
      return;
    }
    updateAdminPin(newPinInput);
    setNewPinInput("");
    alert("Owner PIN code successfully updated!");
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-lock-screen">
        <div className="admin-login-card">
          <div className="admin-badge">🔐 Owner Access Portal</div>
          <h2>Akshaya Glow Naturals</h2>
          <p>Please enter your Owner PIN code to manage products &amp; combos.</p>

          <form onSubmit={handleLogin} className="admin-pin-form">
            <input
              type="password"
              placeholder="Enter PIN (Default: 1234)"
              value={inputPin}
              onChange={(e) => setInputPin(e.target.value)}
              autoFocus
            />
            {pinError && <p className="pin-error-text">{pinError}</p>}
            <button type="submit" className="btn btn-primary btn-block">
              Unlock Owner Dashboard <ArrowRight />
            </button>
          </form>
          <span className="default-pin-hint">Default PIN: <strong>1234</strong></span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="admin-dashboard-page container">
        <div className="admin-header">
          <div>
            <span className="eyebrow"><Sparkles /> Live Store Management</span>
            <h1>Owner Admin Dashboard</h1>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => setIsAuthenticated(false)}>
            🔒 Lock Portal
          </button>
        </div>

        {/* Stats Row */}
        <div className="admin-stats-grid">
          <div className="stat-card">
            <span className="stat-num">{products.length}</span>
            <span className="stat-label">Total Live Products</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{products.filter((p) => p.bestSeller).length}</span>
            <span className="stat-label">Bestseller Badges</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">
              {new Set(products.map((p) => p.categoryLabel)).size}
            </span>
            <span className="stat-label">Active Categories</span>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="admin-success-alert">
            <Check /> {successMsg}
          </div>
        )}

        {/* Admin Navigation Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab-btn ${activeTab === "add" ? "active" : ""}`}
            onClick={() => setActiveTab("add")}
          >
            ➕ Add New Product / Combo
          </button>
          <button
            className={`admin-tab-btn ${activeTab === "manage" ? "active" : ""}`}
            onClick={() => setActiveTab("manage")}
          >
            📦 Manage Catalog ({products.length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === "pin" ? "active" : ""}`}
            onClick={() => setActiveTab("pin")}
          >
            🔑 Security PIN Settings
          </button>
        </div>

        {/* TAB 1: Add New Product */}
        {activeTab === "add" && (
          <div className="admin-panel-box">
            <h2>Add New Item or Special Combo</h2>
            <form onSubmit={handleAddSubmit} className="admin-add-form">
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
                  placeholder="e.g. Deep hydration & natural glow mist"
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
                Publish Product to Live Website <ArrowRight />
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: Manage Existing Catalog */}
        {activeTab === "manage" && (
          <div className="admin-panel-box">
            <div className="panel-title-row">
              <h2>Existing Catalog ({products.length} items)</h2>
              <button
                className="btn btn-outline btn-sm danger-btn"
                onClick={() => {
                  if (confirm("Reset store products back to original default catalog?")) {
                    resetDefaultProducts();
                  }
                }}
              >
                Reset to Default Items
              </button>
            </div>

            <div className="admin-products-table">
              {products.map((prod) => (
                <div key={prod.id} className="admin-product-row">
                  <img
                    src={prod.image || "https://via.placeholder.com/60"}
                    alt={prod.name}
                    className="admin-prod-thumb"
                  />
                  <div className="admin-prod-info">
                    <h4>{prod.name}</h4>
                    <span className="admin-prod-meta">{prod.categoryLabel} • {prod.size}</span>
                  </div>
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
                  <button
                    className={`btn-bestseller-toggle ${prod.bestSeller ? "active" : ""}`}
                    onClick={() => updateProduct(prod.id, { bestSeller: !prod.bestSeller })}
                  >
                    {prod.bestSeller ? "★ Best Seller" : "Set Bestseller"}
                  </button>
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
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Security PIN */}
        {activeTab === "pin" && (
          <div className="admin-panel-box">
            <h2>Change Owner Security PIN</h2>
            <p>Update the PIN code used to access this Owner Portal.</p>
            <form onSubmit={handlePinChange} className="admin-pin-change-form">
              <div className="form-group">
                <label htmlFor="new-pin">New 4-Digit Owner PIN</label>
                <input
                  id="new-pin"
                  type="password"
                  placeholder="e.g. 5678"
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  maxLength={8}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update Owner PIN
              </button>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Admin;
