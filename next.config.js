module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_PROJECT_SECRET: process.env.NEXT_PUBLIC_PROJECT_SECRET,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  },
  images: {
    domains: ['pikblock.infura-ipfs.io', 'infura-ipfs.io'],
  },
};
