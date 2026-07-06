import Hero from "../components/Hero";
import Features from "../components/Features";
import BestSellers from "../components/BestSellers";
import ComboOfferBanner from "../components/ComboOfferBanner";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <BestSellers />
      <ComboOfferBanner />
      <Footer />
    </>
  );
}

export default Home;
