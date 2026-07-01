/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        qualities: [65, 75],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'pceudjfcsxhxzcdybrsr.supabase.co',
            },
        ],
    },
};
