module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_PROJECT_SECRET: process.env.NEXT_PUBLIC_PROJECT_SECRET,
  },
  images: {
    domains: ['pikblock.infura-ipfs.io', 'infura-ipfs.io'],
  },
};
