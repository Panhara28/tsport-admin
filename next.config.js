const nextTranslate = require('next-translate');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'kh'],
    defaultLocale: 'kh',
    // domains: [
    //   {
    //     domain: 'localhost:3001',
    //     defaultLocale: 'kh',
    //   },
    // ],
  },
  images: {
    domains: ['21accec-space.moc.gov.kh', 'cpp-s1.cpp-production.moc.gov.kh'],
  },
};

module.exports = nextTranslate(nextConfig);
