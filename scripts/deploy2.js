const hre = require("hardhat");
const fs = require('fs');

async function main() {


  //PIKBLOCK
  const Pikblock = await hre.ethers.getContractFactory("Pikblock");
  const pikblock = await Pikblock.deploy();
  await pikblock.deployed();
  console.log("pikblock deployed to:", pikblock.address);


  //PIKBLOCK - EXTRA
  const PIKBLOCKEXTRAMarket = await hre.ethers.getContractFactory("PIKBLOCKEXTRAMarket");
  const pikblockextraMarket = await PIKBLOCKEXTRAMarket.deploy();
  await pikblockextraMarket.deployed();
  console.log("pikblockextraMarket deployed to:", pikblockextraMarket.address);

  const PIKBLOCKEXTRA = await hre.ethers.getContractFactory("PIKBLOCKEXTRA");
  const pikblockextra = await PIKBLOCKEXTRA.deploy(pikblockextraMarket.address);
  await pikblockextra.deployed();
  console.log("pikblockextra deployed to:", pikblockextra.address);

  //PIKBLOCK - FAMILY
  const PIKBLOCKFAMILYMarket = await hre.ethers.getContractFactory("PIKBLOCKFAMILYMarket");
  const pikblockfamilyMarket = await PIKBLOCKFAMILYMarket.deploy();
  await pikblockfamilyMarket.deployed();
  console.log("pikblockfamilyMarket deployed to:", pikblockfamilyMarket.address);

  const PIKBLOCKFAMILY = await hre.ethers.getContractFactory("PIKBLOCKFAMILY");
  const pikblockfamily = await PIKBLOCKFAMILY.deploy(pikblockfamilyMarket.address);
  await pikblockfamily.deployed();
  console.log("pikblockfamily deployed to:", pikblockfamily.address);

  //PIKBLOCK - FRIENDS
  const PIKBLOCKFRIENDSMarket = await hre.ethers.getContractFactory("PIKBLOCKFRIENDSMarket");
  const pikblockfriendsMarket = await PIKBLOCKFRIENDSMarket.deploy();
  await pikblockfriendsMarket.deployed();
  console.log("pikblockfriendsMarket deployed to:", pikblockfriendsMarket.address);

  const PIKBLOCKFRIENDS = await hre.ethers.getContractFactory("PIKBLOCKFRIENDS");
  const pikblockfriends = await PIKBLOCKFRIENDS.deploy(pikblockfriendsMarket.address);
  await pikblockfriends.deployed();
  console.log("pikblockfriends deployed to:", pikblockfriends.address);


  //PIKBLOCK - EVENT
  const PIKBLOCKEVENTMarket = await hre.ethers.getContractFactory("PIKBLOCKEVENTMarket");
  const pikblockeventMarket = await PIKBLOCKEVENTMarket.deploy();
  await pikblockeventMarket.deployed();
  console.log("pikblockeventMarket deployed to:", pikblockeventMarket.address);

  const PIKBLOCKEVENT = await hre.ethers.getContractFactory("PIKBLOCKEVENT");
  const pikblockevent = await PIKBLOCKEVENT.deploy(pikblockeventMarket.address);
  await pikblockevent.deployed();
  console.log("pikblockevent deployed to:", pikblockevent.address);

  
  let config = `
  export const pikblockextraMarketaddress = "${pikblockextraMarket.address}"
  export const pikblockextraaddress = "${pikblockextra.address}"
  export const pikblockfamilyMarketaddress = "${pikblockfamilyMarket.address}"
  export const pikblockfamilyaddress = "${pikblockfamily.address}"
  export const pikblockfriendsMarketaddress = "${pikblockfriendsMarket.address}"
  export const pikblockfriendsaddress = "${pikblockfriends.address}"
  export const pikblockaddress = "${pikblock.address}"
  `

  let data = JSON.stringify(config)
  fs.writeFileSync('config2.js', JSON.parse(data))

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
