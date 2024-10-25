/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost", "res.cloudinary.com", "lh3.googleusercontent.com"],
        formats: ["image/avif", "image/webp"],
    
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
