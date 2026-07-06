import FeatureCard from "./FeatureCard";
import { Leaf, Droplet, HandHeart, Tag } from "./Icons";

const features = [
  {
    icon: <Leaf />,
    title: "Pure Natural Ingredients",
    description: "Made with natural herbs and flowers",
  },
  {
    icon: <Droplet />,
    title: "Chemical Free",
    description: "No harmful chemicals, safe for skin",
  },
  {
    icon: <HandHeart />,
    title: "Handmade",
    description: "Prepared in small batches with care",
  },
  {
    icon: <Tag />,
    title: "Affordable",
    description: "Premium quality at reasonable prices",
  },
];

function Features() {
  return (
    <section className="features-section">
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </section>
  );
}

export default Features;
