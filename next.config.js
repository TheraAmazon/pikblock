module.exports = {
  reactStrictMode: true,
  env: {
    PROJECT_ID: process.env.PROJECT_ID,
    PROJECT_SECRET: process.env.PROJECT_SECRET,
  },
  images: {
    domains: ['pikblock.infura-ipfs.io', 'infura-ipfs.io'],
  },
};
