import { Link, useParams } from "react-router-dom";
import products from "../data/products";
import Footer from "../components/Footer";
import { IngredientStamp, WhatsApp, ArrowRight } from "../components/Icons";
import { business, whatsappLink } from "../data/business";
import lipBalmSteps from "../assets/products/beetroot-lip-balm-steps.jpg";
import lipBalmLifestyle from "../assets/products/beetroot-lip-balm-lifestyle.jpg";

// Extra gallery imagery only available for specific products.
const extraGallery = {
  6: [
    { src: lipBalmLifestyle, alt: "Applying Akshaya Glow beetroot lip balm" },
    { src: lipBalmSteps, alt: "How to use: take a small amount, apply evenly, use daily" },
  ],
};

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="not-found">
        <h1>We couldn't find that product</h1>
        <p>It may have been removed, or the link might be incorrect.</p>
        <Link to="/products" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);
  const gallery = extraGallery[product.id] ?? [];
  const orderMessage = whatsappLink(
    `Hello ${business.name}, I would like to order ${product.name} (${product.size}). Please share more details.`
  );

  return (
    <>
      <div className="product-details-page">
        <div className="container product-details-crumb">
          <Link to="/products">Products</Link> / <span>{product.name}</span>
        </div>

        <div className="container product-details">
          <div className="product-details-media">
            {product.image ? (
              <img src={product.image} alt={product.name} className="product-photo-lg" />
            ) : (
              <span className="stamp product-stamp-lg">
                <IngredientStamp kind={product.category} />
              </span>
            )}
          </div>

          <div className="product-details-info">
            <span className="eyebrow">{product.tagline}</span>
            <h1>{product.name}</h1>
            <p className="product-details-meta">{product.size}</p>
            <p className="product-details-price">{product.price}</p>

            <p className="product-details-description">{product.description}</p>

            <div className="product-details-block">
              <h3>Ingredients</h3>
              <ul className="pill-list">
                {product.ingredients.map((ing) => (
                  <li key={ing}>{ing}</li>
                ))}
              </ul>
            </div>

            <div className="product-details-block">
              <h3>How To Use</h3>
              <p>{product.howToUse}</p>
            </div>

            <a href={orderMessage} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              <WhatsApp /> Order on WhatsApp
            </a>
          </div>
        </div>

        {gallery.length > 0 && (
          <div className="container product-gallery">
            {gallery.map((g) => (
              <img key={g.src} src={g.src} alt={g.alt} className="product-gallery-img" />
            ))}
          </div>
        )}

        <div className="container product-details-related">
          <h2 className="section-heading">You May Also Like</h2>
          <div className="products-grid">
            {related.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="related-card">
                {p.image ? (
                  <img src={p.image} alt={p.name} className="related-card-photo" />
                ) : (
                  <span className="stamp">
                    <IngredientStamp kind={p.category} />
                  </span>
                )}
                <div>
                  <h4>{p.name}</h4>
                  <p>{p.price}</p>
                </div>
                <ArrowRight />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;
