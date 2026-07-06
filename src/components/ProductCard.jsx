import { Link } from "react-router-dom";
import { IngredientStamp, WhatsApp } from "./Icons";
import { business, whatsappLink } from "../data/business";

function ProductCard({ product }) {
  const orderMessage = whatsappLink(
    `Hello ${business.name}, I would like to order ${product.name} (${product.size}). Please share more details.`
  );

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
      </Link>

      <Link to={`/product/${product.id}`} className="product-card-title">
        <h3>{product.name}</h3>
      </Link>

      <p className="product-card-tagline">{product.tagline}</p>
      <p className="product-card-size">{product.size}</p>
      <h2>{product.price}</h2>

      <div className="product-card-actions">
        <Link to={`/product/${product.id}`} className="btn btn-outline btn-sm">
          Details
        </Link>
        <a href={orderMessage} target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-sm">
          <WhatsApp /> Order
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
