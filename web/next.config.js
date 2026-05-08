/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",   // 🔥 required for S3

  images: {
    unoptimized: true, // required for static export
  },

  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;