/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // The Developments section was renamed to Projects — preserve old links.
      { source: "/developments", destination: "/projects", permanent: true },
      {
        source: "/developments/:slug*",
        destination: "/projects/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
