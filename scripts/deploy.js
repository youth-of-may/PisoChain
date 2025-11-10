async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");
   
   // Wait for the contract to be deployed
   await hello_world.waitForDeployment();
   
   // Get the contract address
   const contractAddress = await hello_world.getAddress();
   
   console.log("Contract deployed to address:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });