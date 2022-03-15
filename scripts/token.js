const hre = require("hardhat");
const fs = require('fs');

async function main() {

  //PIKBLOCK
  const Pikblock = await hre.ethers.getContractFactory("Pikblock");
  const pikblock = await Pikblock.deploy();
  await pikblock.deployed();
  console.log("pikblock deployed to:", pikblock.address);
  
  let config = `
  export const pikblockaddress = "${pikblock.address}"
  `

  let data = JSON.stringify(config)
  fs.writeFileSync('token.js', JSON.parse(data))

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
