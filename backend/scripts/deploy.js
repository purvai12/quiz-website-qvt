const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting QVT Token deployment...");

  const QVTToken = await hre.ethers.getContractFactory("QVTToken");
  
  console.log("📝 Deploying contract...");
  const qvtToken = await QVTToken.deploy();

  await qvtToken.waitForDeployment();

  const contractAddress = await qvtToken.getAddress();
  
  console.log("✅ QVT Token deployed successfully!");
  console.log("📍 Contract Address:", contractAddress);
  console.log("🔗 Network:", hre.network.name);
  
  if (hre.network.name === "sepolia") {
    console.log("🔍 Etherscan:", `https://sepolia.etherscan.io/address/${contractAddress}`);
  } else if (hre.network.name === "mumbai") {
    console.log("🔍 PolygonScan:", `https://mumbai.polygonscan.com/address/${contractAddress}`);
  }
  
  console.log("\n📋 Next steps:");
  console.log("1. Copy the contract address above");
  console.log("2. Add it to your .env file as CONTRACT_ADDRESS");
  console.log("3. Verify the contract (optional):");
  console.log(`   npx hardhat verify --network ${hre.network.name} ${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
