import Footer from "../components/Footer";
import { Leaf, HandHeart, Tag, IngredientStamp } from "../components/Icons";
import rosePetals from "../assets/ingredients/rose-petals-1.jpg";

const ingredients = [
  { label: "Rose Petals", kind: "rose" },
  { label: "Beetroot", kind: "beet" },
  { label: "Rice", kind: "grain" },
  { label: "Amla, Carrot & Herbs", kind: "herbal" },
];

const reasons = [
  "100% natural ingredients",
  "Chemical free",
  "Handmade in small batches",
  "Skin friendly",
  "Affordable pricing",
  "No mass production, no fillers",
];

function About() {
  return (
    <>
      <div className="about-page">
        <div className="about-hero">
          <span className="eyebrow">Our Story</span>
          <h1>About Akshaya Glow Naturals</h1>
          <p>Nature's goodness, for a natural glow.</p>
        </div>

        <div className="about-photo-banner">
          <img src={rosePetals} alt="Fresh rose petals used in our products" />
          <p>Rose petals from our own sourcing, before they're dried and distilled.</p>
        </div>

        <div className="about-content">
          <div className="about-card">
            <h2><Leaf /> Our Story</h2>
            <p>
              Akshaya Glow Naturals is a homemade skincare brand dedicated to
              creating pure, chemical-free beauty products using traditional
              methods and natural ingredients.
            </p>
            <p>
              We believe nature already provides everything skin needs to
              glow. That's why every product is prepared in small batches, by
              hand, to keep it fresh and honest.
            </p>
          </div>

          <div className="about-card">
            <h2><HandHeart /> Our Mission</h2>
            <p>
              To make affordable, handmade, natural skincare that's safe,
              effective and accessible to everyone -- without the long
              ingredient lists you can't pronounce.
            </p>
          </div>

          <div className="about-card">
            <h2><IngredientStamp kind="rose" /> Ingredients We Use</h2>
            <ul>
              {ingredients.map((i) => (
                <li key={i.label}>
                  <span className="stamp"><IngredientStamp kind={i.kind} /></span>
                  {i.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="about-card">
            <h2><Tag /> Why Choose Us?</h2>
            <ul>
              {reasons.map((reason) => (
                <li key={reason}>
                  <span className="icon-dot"><Leaf /></span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;
