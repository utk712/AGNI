import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, HandHeart, Droplet, Tag, WhatsApp, ArrowRight } from "./Icons";
import HeroArt from "./HeroArt";
import { business, whatsappLink } from "../data/business";

const features = [
  { icon: <Leaf />, label: "Natural Ingredients" },
  { icon: <Droplet />, label: "Chemical Free" },
  { icon: <HandHeart />, label: "Handmade" },
  { icon: <Tag />, label: "Skin Friendly" },
];

function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero-left"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="hero-badge">
          <Leaf /> 100% Natural &amp; Handmade
        </div>

        <h1 className="hero-title">
          Nature's Glow,
          <br />
          Bottled By Hand.
        </h1>

        <p className="hero-subtitle">
          Rose, beetroot and herbal skincare made in small kitchen batches --
          no chemicals, no shortcuts, just what your skin actually needs.
        </p>

        <div className="hero-features">
          {features.map((f) => (
            <span key={f.label}>
              {f.icon} {f.label}
            </span>
          ))}
        </div>

        <div className="hero-buttons">
          <Link to="/products" className="btn btn-primary">
            View Products <ArrowRight />
          </Link>

          <a
            href={whatsappLink(`Hello ${business.name}, I'd like to place an order.`)}
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp"
          >
            <WhatsApp /> Order on WhatsApp
          </a>
        </div>
      </motion.div>

      <motion.div
        className="hero-right"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      >
        <HeroArt className="hero-image" />
      </motion.div>
    </section>
  );
}

export default Hero;
