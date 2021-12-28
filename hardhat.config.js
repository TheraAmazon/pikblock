require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
 const privateKey = fs.readFileSync(".secret").toString().trim() || "";
 const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
       url: "https://rinkeby.infura.io/v3/40b3a3aedddf4e43811c093116586350",
      accounts: [privateKey]
    },
    goerli: {
       url: "https://goerli.infura.io/v3/40b3a3aedddf4e43811c093116586350",
      accounts: [privateKey]
    },
    mumbai: {
      // Infura
      url: "https://polygon-mumbai.infura.io/v3/40b3a3aedddf4e43811c093116586350",
      //url: "https://rpc-mumbai.matic.today",
      accounts: [privateKey]
    },
    matic: {
      // Infura
       url: "https://polygon-mainnet.infura.io/v3/40b3a3aedddf4e43811c093116586350",
      //url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey]
    }
  },
  solidity: {
    compilers: [
    {
    version: "0.5.4",
    },
    {
      version: "0.7.3",
      },
    {
    version: "0.8.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
    },
  },
  ],
  },
};

