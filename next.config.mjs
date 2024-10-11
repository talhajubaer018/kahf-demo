/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['i.ibb.co', 'example.com', 'pattern50.s3.amazonaws.com'], // <== Domain name
    },
    env: {
      NEXT_PUBLIC_BASE_URL_DUMMYP: process.env.NEXT_PUBLIC_BASE_URL_DUMMYP,
    },
    reactStrictMode: false,
  }
  
  

export default nextConfig;
