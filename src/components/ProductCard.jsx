import { Link } from "react-router-dom";
import { IngredientStamp, ShoppingBag } from "./Icons";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const isFreeGift = product.numericPrice === 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isFreeGift) {
      addToCart(product, 1);
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-media">
        {product.image ? (
          <img src={product.image} alt={product.name} className="product-photo" />
        ) : (
          <span className="stamp product-stamp">
            <IngredientStamp kind={product.category} />
          </span>
        )}

        {product.bestSeller && <span className="product-badge badge-bestseller">BESTSELLER</span>}
        {isFreeGift && <span className="product-badge badge-free">FREE GIFT</span>}
      </Link>

      <div className="product-card-body">
        <Link to={`/product/${product.id}`} className="product-card-title">
          <h3>{product.name}</h3>
        </Link>

        <p className="product-card-tagline">{product.tagline}</p>

        <div className="product-price-row">
          <span className="product-card-size">{product.size}</span>
          <h2 className="product-price-val">{product.price}</h2>
        </div>

        <div className="product-card-actions">
          {!isFreeGift ? (
            <button className="btn btn-primary btn-sm flex-1" onClick={handleAddToCart}>
              <ShoppingBag /> Add to Bag
            </button>
          ) : (
            <Link to="/combo" className="btn btn-primary btn-sm flex-1">
              Unlock Free Gift
            </Link>
          )}

          <Link to={`/product/${product.id}`} className="btn btn-outline btn-sm" title="View details">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
