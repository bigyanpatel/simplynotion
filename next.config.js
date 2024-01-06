/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pauldauobkjeltiiegfi.supabase.co',
            },
        ],
    },
}

module.exports = nextConfig
