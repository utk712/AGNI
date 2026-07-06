import roseWaterImg from "../assets/products/rose-water.jpg";
import beetrootPowderImg from "../assets/products/beetroot-powder.jpg";
import rosePowderImg from "../assets/products/rose-powder.jpg";
import ricePowderImg from "../assets/products/rice-powder.jpg";
import lipBalmImg from "../assets/products/beetroot-lip-balm.jpg";

const products = [
  {
    id: 1,
    name: "Rose Water",
    price: "₹60",
    numericPrice: 60,
    size: "100ml",
    category: "rose",
    image: roseWaterImg,
    tagline: "Steam-distilled, alcohol-free toner",
    description:
      "Our rose water is steam-distilled from fresh rose petals in small batches, with nothing added and nothing stripped out. Use it as a daily toner, a setting mist, or a soothing splash after a long day in the sun.",
    ingredients: ["Fresh rose petals", "Distilled water"],
    howToUse: "Mist onto clean skin morning and night, or soak a cotton pad and sweep over the face after cleansing.",
  },
  {
    id: 2,
    name: "Beetroot Powder",
    price: "₹50",
    numericPrice: 50,
    size: "50g",
    category: "beet",
    image: beetrootPowderImg,
    tagline: "Natural glow & gentle exfoliation",
    description:
      "Sun-dried beetroot, ground fine enough for a smooth paste. Loved for the natural flush it brings to the skin and as a colourant for homemade lip and cheek tints.",
    ingredients: ["Sun-dried beetroot"],
    howToUse: "Mix 1 tsp with rose water or curd to form a paste. Apply for 15 minutes, then rinse with lukewarm water.",
  },
  {
    id: 3,
    name: "Rose Powder",
    price: "₹50",
    numericPrice: 50,
    size: "50g",
    category: "rose",
    image: rosePowderImg,
    tagline: "Cooling, calming face pack base",
    description:
      "Dried and finely milled rose petals with a naturally cooling, calming effect on the skin. A gentle everyday face pack base for all skin types, including sensitive skin.",
    ingredients: ["Dried rose petals"],
    howToUse: "Mix 1 tsp with rose water or milk to a smooth paste. Apply for 15-20 minutes and rinse.",
  },
  {
    id: 4,
    name: "Rice Powder",
    price: "Free with combo",
    numericPrice: 0,
    size: "25g",
    category: "grain",
    image: ricePowderImg,
    tagline: "Brightening, oil-absorbing finish",
    description:
      "Finely milled rice, a staple in traditional skincare for its light, brightening finish. Helps absorb excess oil and leaves skin feeling soft and smooth.",
    ingredients: ["Milled rice"],
    howToUse: "Mix with rose water or honey for a brightening face pack, 2-3 times a week.",
  },
  {
    id: 5,
    name: "ABC Powder",
    price: "₹120",
    numericPrice: 120,
    size: "100g",
    category: "herbal",
    image: null,
    tagline: "Amla, Beetroot & Carrot blend",
    description:
      "Our signature herbal blend of amla, beetroot and carrot -- three ingredients traditionally used together for nourished, even-toned skin. A do-it-all weekly face pack.",
    ingredients: ["Amla", "Beetroot", "Carrot"],
    howToUse: "Mix 1-2 tsp with rose water to a paste. Apply for 20 minutes, then rinse with lukewarm water. Use twice a week.",
  },
  {
    id: 6,
    name: "Beetroot Lip Balm",
    price: "₹40",
    numericPrice: 40,
    size: "20g",
    category: "lip",
    image: lipBalmImg,
    tagline: "Tinted, nourishing daily balm",
    description:
      "A handmade lip balm tinted naturally with beetroot, made to soften dry lips while leaving behind a soft, natural flush of colour.",
    ingredients: ["Beetroot extract", "Natural butters & oils"],
    howToUse: "Apply as needed through the day, and before bed for overnight nourishment.",
  },
];

export default products;
