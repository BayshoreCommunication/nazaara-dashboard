/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    COOKIE_NAME: process.env.COOKIE_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    CLOUDINARY_PRESET_UPLOAD: process.env.CLOUDINARY_PRESET_UPLOAD,
    CLOUDINARY_PRESET_PRODUCTS: process.env.CLOUDINARY_PRESET_PRODUCTS,
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
  },
  images: {
    domains: ["anzara.s3.amazonaws.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
