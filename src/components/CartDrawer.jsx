import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { business, whatsappLink } from "../data/business";
import { WhatsApp, Sparkles, Trash, X, ArrowRight, ShoppingBag } from "./Icons";

function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeGiftUnlocked,
    amountLeftForFreeGift,
    freeGiftThreshold,
    clearCart,
  } = useCart();

  const { createCustomerOrder } = useProducts();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [note, setNote] = useState("");

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Automatically record order in Owner Accounting System
    const orderItems = cart.map((item) => ({
      name: item.product.name,
      size: item.product.size,
      quantity: item.quantity,
      price: item.product.numericPrice,
    }));

    const finalTotal = subtotal >= 150 ? subtotal : subtotal + 40;

    createCustomerOrder({
      customerName: customerName || "Customer",
      phone: customerPhone || "Not specified",
      address: deliveryAddress || "Share in chat",
      items: orderItems,
      subtotal: subtotal,
      totalAmount: finalTotal,
      freeGift: freeGiftUnlocked,
    });

    let itemsListText = cart
      .map(
        (item, index) =>
          `${index + 1}. *${item.product.name}* (${item.product.size}) - Qty: ${item.quantity} x ${item.product.price} = ₹${item.product.numericPrice * item.quantity}`
      )
      .join("\n");

    if (freeGiftUnlocked) {
      itemsListText += `\n\n🎁 *SPECIAL FREE GIFT INCLUDED*: Rice Powder (25g) - ₹0`;
    }

    const message = `🌿 *NEW ORDER FROM AKSHAYA GLOW NATURALS WEBSITE*

*Customer Details:*
👤 *Name:* ${customerName || "Customer"}
📱 *Phone:* ${customerPhone || "Not specified"}
📍 *Delivery Address:* ${deliveryAddress || "Will share in chat"}
${note ? `📝 *Note:* ${note}\n` : ""}
---
*Order Items:*
${itemsListText}

---
💵 *Subtotal:* ₹${subtotal}
🚚 *Delivery Fee:* ${subtotal >= 150 ? "FREE 🎉" : "Standard ₹40"}
💰 *TOTAL AMOUNT:* ₹${finalTotal}

Please confirm availability and share payment details (UPI/PhonePe). Thank you!`;

    const url = whatsappLink(message);
    window.open(url, "_blank");

    clearCart();
    closeCart();
  };

  const giftProgressPercent = Math.min(100, Math.round((subtotal / freeGiftThreshold) * 100));

  return (
    <AnimatePresence>
      <div className="cart-backdrop" onClick={closeCart}>
        <motion.div
          className="cart-drawer"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="cart-header">
            <div className="cart-header-title">
              <ShoppingBag />
              <h2>Your Botanical Bag</h2>
              <span className="cart-count-badge">{cart.reduce((a, b) => a + b.quantity, 0)}</span>
            </div>
            <button className="cart-close-btn" onClick={closeCart} aria-label="Close cart">
              <X />
            </button>
          </div>

          {/* Free Gift Progress Banner */}
          <div className="cart-gift-banner">
            <div className="gift-banner-text">
              <Sparkles />
              {freeGiftUnlocked ? (
                <span>
                  <strong>Congratulations!</strong> Free 25g Rice Powder unlocked! 🎉
                </span>
              ) : (
                <span>
                  Add <strong>₹{amountLeftForFreeGift}</strong> more for <strong>FREE Rice Powder (25g)</strong>!
                </span>
              )}
            </div>
            <div className="gift-progress-track">
              <div
                className="gift-progress-fill"
                style={{ width: `${giftProgressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Body */}
          <div className="cart-body">
            {cart.length === 0 ? (
              <div className="empty-cart-state">
                <div className="empty-cart-icon">🌿</div>
                <h3>Your bag is currently empty</h3>
                <p>Explore our handcrafted botanical oils, waters, and powders to get glowing!</p>
                <button className="btn btn-primary" onClick={closeCart}>
                  Browse Products <ArrowRight />
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.product.id} className="cart-item-card">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="cart-item-img"
                      />
                      <div className="cart-item-details">
                        <div className="cart-item-head">
                          <h4 className="cart-item-name">{item.product.name}</h4>
                          <button
                            className="cart-item-remove"
                            onClick={() => removeFromCart(item.product.id)}
                            title="Remove item"
                          >
                            <Trash />
                          </button>
                        </div>
                        <span className="cart-item-size">{item.product.size}</span>
                        <div className="cart-item-bottom">
                          <span className="cart-item-price">
                            ₹{item.product.numericPrice * item.quantity}
                          </span>
                          <div className="qty-controls">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Free Gift Preview if unlocked */}
                {freeGiftUnlocked && (
                  <div className="free-gift-preview-card">
                    <span className="free-badge">FREE GIFT</span>
                    <div className="gift-info">
                      <h4>Rice Powder (25g)</h4>
                      <p>Brightening, oil-absorbing finish pack</p>
                    </div>
                    <span className="gift-price">₹0</span>
                  </div>
                )}

                {/* Customer Checkout Form */}
                <div className="checkout-form-section">
                  <h3>Shipping &amp; Contact Info</h3>
                  <div className="form-group">
                    <label htmlFor="cust-name">Your Full Name</label>
                    <input
                      id="cust-name"
                      type="text"
                      placeholder="e.g. Ananya Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cust-phone">WhatsApp Phone Number</label>
                    <input
                      id="cust-phone"
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cust-address">Delivery Address</label>
                    <textarea
                      id="cust-address"
                      rows="2"
                      placeholder="House No, Street, City, Pincode"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer / Checkout */}
          {cart.length > 0 && (
            <div className="cart-footer">
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>₹{subtotal}</strong>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span className={subtotal >= 150 ? "free-text" : ""}>
                  {subtotal >= 150 ? "FREE" : "₹40"}
                </span>
              </div>
              <div className="summary-row total-row">
                <span>Estimated Total</span>
                <strong>₹{subtotal >= 150 ? subtotal : subtotal + 40}</strong>
              </div>

              <button
                className="btn btn-whatsapp btn-block"
                onClick={handleWhatsAppCheckout}
              >
                <WhatsApp /> Send Order on WhatsApp
              </button>
              <p className="cart-secure-note">
                🔒 Orders sent directly to Akshaya Glow Naturals via WhatsApp &amp; automatically logged in Owner Accounting!
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CartDrawer;
