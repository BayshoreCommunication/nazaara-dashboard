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
    API_SECURE_KEY: process.env.API_SECURE_KEY,
    API_BASE_URL: process.env.API_BASE_URL,
    UPLOAD_PRESET: process.env.UPLOAD_PRESET,
    OTHER_PRESET: process.env.OTHER_PRESET,
  },
  images: {
    unoptimized: true,
    domains: [
      "anzara.s3.amazonaws.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
