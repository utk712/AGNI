import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "./ProductCard";
import { ArrowRight } from "./Icons";

function BestSellers() {
  const { products } = useProducts();
  const featured = products.filter((p) => p.bestSeller).slice(0, 3);
  const displayItems = featured.length > 0 ? featured : products.slice(0, 3);

  return (
    <section className="best-sellers">
      <div className="section-intro">
        <span className="eyebrow">Small Batch Favourites</span>
        <h2 className="section-heading">Our Best Sellers</h2>
      </div>

      <div className="products-grid">
        {displayItems.map((product) => (
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
