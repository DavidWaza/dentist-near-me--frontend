/** @type {import('next').NextConfig} */
const nextConfig = {
  // Font stylesheet is loaded at runtime via <link>; skip build-time inlining
  // so builds succeed in offline / restricted CI environments.
  optimizeFonts: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};
export default nextConfig;
