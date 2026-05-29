/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/api/:path*", // Matches all API calls starting with /api/
          destination: "http://localhost:4000/api/:path*" // Proxy to backend
        }
      ];
    }
  };
  
  export default nextConfig;
  