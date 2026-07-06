import { Link } from "react-router-dom";
import ComboOfferBanner from "../components/ComboOfferBanner";
import Footer from "../components/Footer";
import { ArrowRight } from "../components/Icons";

function ComboOffer() {
  return (
    <>
      <div className="combo-page">
        <div className="products-intro">
          <span className="eyebrow">Limited Time Offer</span>
          <h1 className="products-title">Combo Offer</h1>
        </div>

        <ComboOfferBanner />

        <div className="best-sellers-cta">
          <Link to="/products" className="btn btn-outline">
            Browse All Products <ArrowRight />
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ComboOffer;
