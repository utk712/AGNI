import { Link } from "react-router-dom";
import products from "../data/products";
import ProductCard from "./ProductCard";
import { ArrowRight } from "./Icons";

function BestSellers() {
  const featured = products.slice(0, 3);

  return (
    <section className="best-sellers">
      <div className="section-intro">
        <span className="eyebrow">Small Batch Favourites</span>
        <h2 className="section-heading">Our Best Sellers</h2>
      </div>

      <div className="products-grid">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="best-sellers-cta">
        <Link to="/products" className="btn btn-outline">
          View All Products <ArrowRight />
        </Link>
      </div>
    </section>
  );
}

export default BestSellers;
