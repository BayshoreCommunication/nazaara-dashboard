/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    COOKIE_NAME: process.env.COOKIE_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

module.exports = nextConfig;

// module.exports = {
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.node = {
//         fs: 'empty',
//         global: true,
//         crypto: 'empty',
//         process: true,
//         module: false,
//         clearImmediate: false,
//         setImmediate: false,
//       };
//     }

//     return config;
//   },
// };
