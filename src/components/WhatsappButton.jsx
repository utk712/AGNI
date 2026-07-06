import { WhatsApp } from "./Icons";
import { business, whatsappLink } from "../data/business";

function WhatsappButton() {
  return (
    <a
      href={whatsappLink(`Hello ${business.name}, I'd like to know more about your products.`)}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Order on WhatsApp"
    >
      <WhatsApp />
    </a>
  );
}

export default WhatsappButton;
