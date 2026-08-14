import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Close, WhatsApp, ShoppingBag } from "./Icons";
import { business, whatsappLink } from "../data/business";
import { useCart } from "../context/CartContext";
import logo from "../assets/brand/logo.jpg";
import "./Navbar.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/combo", label: "Combo Offer" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalItemsCount, openCart } = useCart();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <NavLink to="/" className="logo" onClick={() => setOpen(false)}>
          <img src={logo} alt={business.name} className="logo-mark" />
          <span className="logo-text">Akshaya Glow Naturals</span>
        </NavLink>

        <div className="nav-links nav-links-desktop">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "active" : undefined)}
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-right-actions">
          <button className="nav-cart-btn" onClick={openCart} aria-label="Open cart bag">
            <ShoppingBag />
            <span className="nav-cart-label">Bag</span>
            {totalItemsCount > 0 && <span className="cart-badge">{totalItemsCount}</span>}
          </button>

          <a
            href={whatsappLink(`Hello ${business.name}, I'd like to place an order.`)}
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn nav-links-desktop"
          >
            <WhatsApp /> WhatsApp
          </a>

          <button
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="nav-mobile-links">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => (isActive ? "active" : undefined)}
                  end={link.to === "/"}
                >
                  {link.label}
                </NavLink>
              ))}
              <button
                className="btn btn-outline btn-block"
                onClick={() => {
                  setOpen(false);
                  openCart();
                }}
              >
                <ShoppingBag /> View Bag ({totalItemsCount})
              </button>
              <a
                href={whatsappLink(`Hello ${business.name}, I'd like to place an order.`)}
                target="_blank"
                rel="noreferrer"
                className="whatsapp-btn"
                onClick={() => setOpen(false)}
              >
                <WhatsApp /> Order on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
