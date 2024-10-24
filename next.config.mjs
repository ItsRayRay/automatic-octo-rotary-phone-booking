/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost", "res.cloudinary.com", "lh3.googleusercontent.com"],
        formats: ["image/avif", "image/webp"],
    
    },
};

export default nextConfig;
