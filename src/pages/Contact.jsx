import { useState } from "react";
import Footer from "../components/Footer";
import { Phone, WhatsApp, Mail, Leaf } from "../components/Icons";
import { business, whatsappLink } from "../data/business";

const initialForm = { name: "", phone: "", email: "", message: "" };

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!form.phone.trim()) next.phone = "A phone number helps us reach you.";
    if (!form.message.trim()) next.message = "Let us know what you'd like to ask.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      setSent(false);
      return;
    }

    const message = [
      `Hello ${business.name}, I'm reaching out from your website.`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      `Message: ${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    setSent(true);
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setForm(initialForm);
  }

  return (
    <>
      <div className="contact-page">
        <div className="contact-header">
          <span className="eyebrow">Get In Touch</span>
          <h1>Contact Us</h1>
          <p>
            We'd love to hear from you -- reach out for orders, product
            questions or collaborations.
          </p>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <h2>Reach Us Directly</h2>

            <p className="contact-info-row">
              <span className="stamp"><Phone /></span>
              {business.phoneDisplay}
            </p>
            <p className="contact-info-row">
              <span className="stamp"><WhatsApp /></span>
              WhatsApp orders available, day or night
            </p>
            <p className="contact-info-row">
              <span className="stamp"><Mail /></span>
              {business.email}
            </p>
            <p className="contact-info-row">
              <span className="stamp"><Leaf /></span>
              Homemade natural skincare, made to order
            </p>

            <a
              href={whatsappLink(`Hello ${business.name}, I'd like to place an order.`)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp btn-block"
              style={{ marginTop: "12px" }}
            >
              <WhatsApp /> Order on WhatsApp
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <h2>Send Us A Message</h2>

            {sent && (
              <p className="form-success">
                Thanks! We've opened WhatsApp with your message ready to send.
              </p>
            )}

            <div className={`field ${errors.name ? "invalid" : ""}`}>
              <label htmlFor="name">Your Name</label>
              <input id="name" name="name" type="text" value={form.name} onChange={handleChange} />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className={`field ${errors.phone ? "invalid" : ""}`}>
              <label htmlFor="phone">Phone Number</label>
              <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>

            <div className="field">
              <label htmlFor="email">Email Address (optional)</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
            </div>

            <div className={`field ${errors.message ? "invalid" : ""}`}>
              <label htmlFor="message">Your Message</label>
              <textarea id="message" name="message" rows="5" value={form.message} onChange={handleChange} />
              {errors.message && <p className="error">{errors.message}</p>}
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
