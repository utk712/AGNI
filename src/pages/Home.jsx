import Hero from "../components/Hero";
import Features from "../components/Features";
import BestSellers from "../components/BestSellers";
import SkinQuiz from "../components/SkinQuiz";
import Reviews from "../components/Reviews";
import ComboOfferBanner from "../components/ComboOfferBanner";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <BestSellers />
      <SkinQuiz />
      <Reviews />
      <ComboOfferBanner />
      <Footer />
    </>
  );
}

export default Home;
