const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  i18n: i18n,
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `/api/:path*`,
      },
    ]
  },
  images: {
    domains: ['api.sehatcepat.com'],
  },
}
