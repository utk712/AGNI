import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Leaf, ArrowRight, Refresh } from "./Icons";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

const concernsList = [
  { id: "glow", label: "Dullness & Sun Tan", icon: "✨" },
  { id: "dry", label: "Dryness & Dehydration", icon: "💧" },
  { id: "lip", label: "Chapped or Dark Lips", icon: "💋" },
  { id: "pigment", label: "Uneven Tone & Dark Spots", icon: "🌸" },
];

const skinTypesList = [
  { id: "all", label: "Normal / Balanced" },
  { id: "dry", label: "Dry & Tight" },
  { id: "oily", label: "Oily & Shiny" },
  { id: "sensitive", label: "Sensitive & Easy Redness" },
];

function SkinQuiz() {
  const { products } = useProducts();
  const { addToCart, openCart } = useCart();
  const [step, setStep] = useState(1);
  const [selectedConcern, setSelectedConcern] = useState(null);
  const [selectedSkinType, setSelectedSkinType] = useState(null);

  const handleSelectConcern = (concernId) => {
    setSelectedConcern(concernId);
    setStep(2);
  };

  const handleSelectSkinType = (typeId) => {
    setSelectedSkinType(typeId);
    setStep(3);
  };

  const getRecommendedProducts = () => {
    if (selectedConcern === "lip") {
      return products.filter((p) => p.category === "lip" || p.category === "rose").slice(0, 2);
    } else if (selectedConcern === "pigment") {
      return products.filter((p) => p.name.includes("ABC") || p.category === "rose").slice(0, 2);
    } else if (selectedConcern === "dry") {
      return products.slice(0, 3);
    } else {
      return products.slice(0, 3);
    }
  };

  const recommendedItems = getRecommendedProducts().filter(Boolean);

  const handleAddAllToCart = () => {
    recommendedItems.forEach((item) => {
      if (item.numericPrice > 0) {
        addToCart(item, 1);
      }
    });
    openCart();
  };

  const resetQuiz = () => {
    setStep(1);
    setSelectedConcern(null);
    setSelectedSkinType(null);
  };

  return (
    <section className="skin-quiz-section">
      <div className="quiz-container">
        <div className="quiz-header">
          <span className="eyebrow">
            <Sparkles /> Personalized Match
          </span>
          <h2 className="quiz-title">Find Your 100% Natural Skin Routine</h2>
          <p className="quiz-subtitle">
            Answer 2 quick questions to discover handcrafted botanical blends made for your exact skin goals.
          </p>
        </div>

        <div className="quiz-card-box">
          {/* Progress Indicators */}
          <div className="quiz-progress-bar">
            <div className={`quiz-step-pill ${step >= 1 ? "active" : ""}`}>1. Skin Goal</div>
            <div className={`quiz-step-pill ${step >= 2 ? "active" : ""}`}>2. Skin Type</div>
            <div className={`quiz-step-pill ${step >= 3 ? "active" : ""}`}>3. Your Match</div>
          </div>

          {step === 1 && (
            <motion.div
              className="quiz-step-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3>What is your primary skin goal today?</h3>
              <div className="quiz-options-grid">
                {concernsList.map((item) => (
                  <button
                    key={item.id}
                    className="quiz-option-btn"
                    onClick={() => handleSelectConcern(item.id)}
                  >
                    <span className="quiz-option-icon">{item.icon}</span>
                    <span className="quiz-option-label">{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              className="quiz-step-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3>How would you describe your skin type?</h3>
              <div className="quiz-options-grid">
                {skinTypesList.map((item) => (
                  <button
                    key={item.id}
                    className="quiz-option-btn"
                    onClick={() => handleSelectSkinType(item.id)}
                  >
                    <span className="quiz-option-label">{item.label}</span>
                  </button>
                ))}
              </div>
              <button className="btn btn-text quiz-back-btn" onClick={() => setStep(1)}>
                ← Back to Step 1
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              className="quiz-step-content quiz-results"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="result-badge">
                <Leaf /> Verified Natural Routine Recommendation
              </div>
              <h3>Your Ideal Botanical Routine</h3>
              <p className="result-desc">
                Based on your skin profile, this handcrafted combination provides optimal hydration, nourishment, and natural radiance.
              </p>

              <div className="result-products-list">
                {recommendedItems.map((prod) => (
                  <div key={prod.id} className="recommended-prod-card">
                    <img src={prod.image || "https://via.placeholder.com/50"} alt={prod.name} />
                    <div className="rec-info">
                      <h4>{prod.name}</h4>
                      <p>{prod.tagline}</p>
                      <span className="rec-price">{prod.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="result-actions">
                <button className="btn btn-primary btn-lg" onClick={handleAddAllToCart}>
                  Add Entire Routine to Bag <ArrowRight />
                </button>
                <button className="btn btn-outline" onClick={resetQuiz}>
                  <Refresh /> Retake Quiz
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SkinQuiz;
