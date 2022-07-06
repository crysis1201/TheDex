/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
        {
            source: '/swap/selectCoin',
            destination: '/swap'
        },
        {
          source: '/swap/toCoin',
          destination: '/swap'
      }
    ];
}
}

module.exports = nextConfig
