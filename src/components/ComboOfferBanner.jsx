import { WhatsApp } from "./Icons";
import { business, whatsappLink } from "../data/business";

function ComboOfferBanner() {
  return (
    <section className="combo-section">
      <div className="combo-left">
        <span className="eyebrow">Limited Time</span>
        <h2 className="section-heading">Natural Glow Combo</h2>

        <p className="combo-text">
          Buy any <strong>2 products</strong> and get <strong>Rice Powder 25g free</strong>
        </p>

        <div className="combo-products">
          <span>Beetroot Powder 50g</span>
          <span>+</span>
          <span>Rose Powder 50g</span>
          <span>+</span>
          <span>Rice Powder 25g free</span>
        </div>

        <a
          href={whatsappLink(`Hello ${business.name}, I'd like to order the Natural Glow Combo (₹199).`)}
          target="_blank"
          rel="noreferrer"
          className="btn btn-whatsapp combo-cta"
        >
          <WhatsApp /> Claim This Combo
        </a>
      </div>

      <div className="combo-price">
        <h1>₹199</h1>
        <p>Special Offer</p>
      </div>
    </section>
  );
}

export default ComboOfferBanner;
