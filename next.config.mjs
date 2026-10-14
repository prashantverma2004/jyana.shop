/** @type {import('next').NextConfig} */
const nextConfig = {
  // 85 is used for above-the-fold hero/gallery images, 75 everywhere else.
  images: { qualities: [75, 85] },

  // Keep old static-site URLs working.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/shop.html", destination: "/shop", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/checkout.html", destination: "/checkout", permanent: true },
      { source: "/product.html", has: [{ type: "query", key: "id", value: "(?<id>.*)" }], destination: "/products/:id", permanent: true },
      { source: "/product.html", destination: "/shop", permanent: true }
    ];
  }
};

export default nextConfig;
