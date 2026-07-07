export const business = {
  name: "Akshaya Glow Naturals",
  phoneDisplay: "+91 9302579140",
  whatsappNumber: "919302579140",
  email: "hello@akshayaglow.com",
};

export function whatsappLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${business.whatsappNumber}?text=${text}`;
}
