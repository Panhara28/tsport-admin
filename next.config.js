/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['s1.moc.gov.kh', 's2.moc.gov.kh', 'cpp-s1.cpp-production.moc.gov.kh'],
  },
};

module.exports = nextConfig;
