/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
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
