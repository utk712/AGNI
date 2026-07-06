import products from "../data/products";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function Products() {
  return (
    <>
      <div className="products-page">
        <div className="products-intro">
          <span className="eyebrow">The Full Range</span>
          <h1 className="products-title">Our Products</h1>
          <p className="products-subtitle">
            Every product is made in small batches by hand -- pick what your
            skin needs and order directly on WhatsApp.
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Products;
