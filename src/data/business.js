export const business = {
  name: "Akshaya Glow Naturals",
  phoneDisplay: "+91 87123 18547",
  whatsappNumber: "918712318547",
  email: "hello@akshayaglow.com",
};

export function whatsappLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${business.whatsappNumber}?text=${text}`;
}
