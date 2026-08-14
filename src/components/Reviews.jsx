import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Check, Sparkles } from "./Icons";

const reviewsData = [
  {
    id: 1,
    name: "Pooja Sharma",
    location: "Hyderabad",
    rating: 5,
    productUsed: "Rose Water & Beetroot Lip Balm",
    date: "Verified Customer - 2 weeks ago",
    comment:
      "The steam-distilled Rose Water feels so pure and refreshing on my skin! And the Beetroot Lip Balm gives the most gorgeous natural tint without drying out my lips.",
  },
  {
    id: 2,
    name: "Kavita Reddy",
    location: "Bengaluru",
    rating: 5,
    productUsed: "ABC Powder (100g)",
    date: "Verified Customer - 1 month ago",
    comment:
      "ABC Powder (Amla, Beetroot, Carrot) has completely changed my Sunday skincare pack! My skin tone feels noticeably brighter and so soft after rinsing.",
  },
  {
    id: 3,
    name: "Sneha Patel",
    location: "Mumbai",
    rating: 5,
    productUsed: "Rose Powder & Rice Powder Combo",
    date: "Verified Customer - 3 weeks ago",
    comment:
      "I love that there are zero chemicals or fragrance powders. It smells naturally of real dried roses! Plus getting the Rice Powder free with combo was an awesome deal.",
  },
  {
    id: 4,
    name: "Divya Verma",
    location: "Delhi",
    rating: 5,
    productUsed: "Beetroot Lip Balm",
    date: "Verified Customer - 5 days ago",
    comment:
      "Ordered 3 lip balms for me and my sisters. Small batch handmade quality really shows compared to store-bought petrolatum balms!",
  },
];

function Reviews() {
  const [filter, setFilter] = useState("all");

  return (
    <section className="reviews-section">
      <div className="reviews-container">
        <div className="reviews-header">
          <span className="eyebrow">
            <Sparkles /> Real Customer Love
          </span>
          <h2 className="reviews-title">Loved by Natural Skincare Enthusiasts</h2>
          <div className="rating-summary-box">
            <div className="rating-score">4.9</div>
            <div className="rating-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="star-filled" />
              ))}
            </div>
            <span className="rating-count">Based on 180+ small-batch orders</span>
          </div>
        </div>

        <div className="reviews-grid">
          {reviewsData.map((rev) => (
            <motion.div
              key={rev.id}
              className="review-card"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
            >
              <div className="review-card-head">
                <div className="reviewer-info">
                  <h4>{rev.name}</h4>
                  <span className="reviewer-loc">{rev.location}</span>
                </div>
                <div className="verified-badge">
                  <Check /> Verified Purchase
                </div>
              </div>

              <div className="review-stars">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="star-filled" />
                ))}
              </div>

              <p className="review-comment">"{rev.comment}"</p>

              <div className="review-product-tag">
                <span>Used: {rev.productUsed}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
