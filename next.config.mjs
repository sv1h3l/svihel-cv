/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export', // když se nepoužije firebase tak smazat
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
