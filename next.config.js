/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cpp-s1.moc.gov.kh',
      'cpp-s1.cpp-production.moc.gov.kh',
      's2.moc.gov.kh',
      's1.moc.gov.kh',
      'uat-space.uat.moc.gov.kh',
    ],
  },
};

module.exports = nextConfig;
