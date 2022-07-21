// eslint-disable-next-line @typescript-eslint/no-var-requires
const optimizedImages = require('next-optimized-images')

/** @type {import('next').NextConfig} */
const nextConfig = optimizedImages({
  reactStrictMode: true,
  handleImages: ['svg'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fixes npm packages that depend on `fs` module
      // https://github.com/vercel/next.js/issues/7755#issuecomment-937721514
      config.resolve.fallback.fs = false
    }
    return config
  },
  env: {
    XMTP_QUERY_URL: process.env.XMTP_QUERY_URL,
    XMTP_TX_URL: process.env.XMTP_TX_URL,
    XMTP_WS_URL: process.env.XMTP_WS_URL,
  },
})

module.exports = nextConfig
