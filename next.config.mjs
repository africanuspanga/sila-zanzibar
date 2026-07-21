/** @type {import('next').NextConfig} */
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : null;

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow next/image to render admin-uploaded photos from Supabase Storage.
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }]
      : [],
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
