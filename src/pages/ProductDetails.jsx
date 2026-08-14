import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { business, whatsappLink } from "../data/business";
import { WhatsApp, ShoppingBag, Check, ArrowRight } from "../components/Icons";

function ProductDetails() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("benefits");

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="product-details-page not-found container">
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist or has been updated.</p>
        <Link to="/products" className="btn btn-primary">
          Back to All Products
        </Link>
      </div>
    );
  }

  const isFreeGift = product.numericPrice === 0;

  const handleAddToCart = () => {
    if (!isFreeGift) {
      addToCart(product, quantity);
      openCart();
    }
  };

  const directOrderMessage = whatsappLink(
    `Hello ${business.name}, I would like to order ${quantity}x ${product.name} (${product.size}) for ${product.price}.`
  );

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <>
      <div className="product-details-page">
        <div className="breadcrumb container">
          <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span>{product.name}</span>
        </div>

        <div className="product-details-container container">
          {/* Left Media Column */}
          <div className="product-media-col">
            <div className="product-main-image-box">
              {product.image ? (
                <img src={product.image} alt={product.name} className="product-detail-photo" />
              ) : (
                <div className="placeholder-stamp-large">🌿</div>
              )}
              {product.bestSeller && <span className="product-badge badge-bestseller">BESTSELLER</span>}
            </div>
          </div>

          {/* Right Product Details Info Column */}
          <div className="product-info-col">
            <span className="eyebrow">{product.categoryLabel || "100% Handcrafted"}</span>
            <h1 className="detail-title">{product.name}</h1>
            <p className="detail-tagline">{product.tagline}</p>

            <div className="detail-price-box">
              <h2 className="detail-price">{product.price}</h2>
              <span className="detail-size">Size: {product.size}</span>
            </div>

            <p className="detail-description">{product.description}</p>

            {/* Badges list */}
            <div className="detail-badges-list">
              <span><Check /> 100% Pure &amp; Chemical-Free</span>
              <span><Check /> Handcrafted in Small Batches</span>
              <span><Check /> Eco-Friendly Packaging</span>
            </div>

            {/* Quantity Selector & Cart CTA */}
            {!isFreeGift ? (
              <div className="detail-purchase-row">
                <div className="detail-qty-picker">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity((q) => q + 1)}>+</button>
                </div>

                <button className="btn btn-primary btn-lg flex-1" onClick={handleAddToCart}>
                  <ShoppingBag /> Add to Bag (₹{product.numericPrice * quantity})
                </button>
              </div>
            ) : (
              <div className="free-gift-notice">
                <p>🎁 This item is <strong>FREE</strong> when you buy any combo or order over ₹150!</p>
                <Link to="/combo" className="btn btn-primary">
                  View Special Combos <ArrowRight />
                </Link>
              </div>
            )}

            {/* Direct WhatsApp button */}
            <a
              href={directOrderMessage}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp btn-block"
            >
              <WhatsApp /> Order Directly on WhatsApp
            </a>

            {/* Tabbed Info Section */}
            <div className="detail-tabs-section">
              <div className="detail-tab-headers">
                <button
                  className={`tab-btn ${activeTab === "benefits" ? "active" : ""}`}
                  onClick={() => setActiveTab("benefits")}
                >
                  Key Ingredients
                </button>
                <button
                  className={`tab-btn ${activeTab === "howToUse" ? "active" : ""}`}
                  onClick={() => setActiveTab("howToUse")}
                >
                  How to Apply
                </button>
                <button
                  className={`tab-btn ${activeTab === "safety" ? "active" : ""}`}
                  onClick={() => setActiveTab("safety")}
                >
                  Storage &amp; Safety
                </button>
              </div>

              <div className="detail-tab-content">
                {activeTab === "benefits" && (
                  <div className="tab-pane">
                    <h4>Ingredients:</h4>
                    <ul>
                      {product.ingredients && product.ingredients.length > 0 ? (
                        product.ingredients.map((ing, i) => (
                          <li key={i}>🌿 {ing}</li>
                        ))
                      ) : (
                        <li>🌿 100% Organic Botanical Extracts</li>
                      )}
                    </ul>
                  </div>
                )}

                {activeTab === "howToUse" && (
                  <div className="tab-pane">
                    <h4>Directions for Use:</h4>
                    <p>{product.howToUse || "Apply to clean skin as needed."}</p>
                  </div>
                )}

                {activeTab === "safety" && (
                  <div className="tab-pane">
                    <h4>Shelf Life &amp; Care:</h4>
                    <p>
                      Store in a cool, dry place away from direct sunlight. As our products contain no artificial preservatives, use within 6 months of opening. Perform a patch test before first use.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section container">
            <h3>You Might Also Love</h3>
            <div className="products-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;
