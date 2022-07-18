/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['uat-space.uat.moc.gov.kh', 'cpp-s1.cpp-production.moc.gov.kh'],
  },
};

module.exports = nextConfig;
