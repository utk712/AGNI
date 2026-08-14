import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { Phone, WhatsApp, Leaf } from "./Icons";
import { business } from "../data/business";

function Footer() {
  const { products } = useProducts();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <span className="footer-brand">{business.name}</span>
          <p>Nature's Goodness For A Natural Glow</p>
          <p>Pure - Natural - Handmade</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/combo">Combo Offer</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Our Range</h3>
          <ul className="footer-links">
            {products.slice(0, 6).map((p) => (
              <li key={p.id}>
                <Link to={`/product/${p.id}`}>{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p className="footer-contact"><Phone /> {business.phoneDisplay}</p>
          <p className="footer-contact"><WhatsApp /> WhatsApp orders available</p>
          <p className="footer-contact"><Leaf /> Homemade natural skincare</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {business.name}. All rights reserved.</span>
        <Link to="/admin" className="owner-lock-link" title="Owner Access Portal">
          🔒 Owner Portal
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
