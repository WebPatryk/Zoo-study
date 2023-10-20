const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "styles/main.scss";`
  },
  experimental: {
    allowMiddlewareResponseBody: true
  }
};

module.exports = nextConfig;
