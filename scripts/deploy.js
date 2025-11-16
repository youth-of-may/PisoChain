import hre from 'hardhat';
import "@nomicfoundation/hardhat-ethers";
async function main() {
  const [sender] = await hre.ethers.getSigners();

  // deploy role registry first 
   const RoleRegistry = await hre.ethers.getContractFactory("RoleRegistry");
   const role = await RoleRegistry.deploy()
   await role.waitForDeployment();
   console.log("RoleRegistry deployed at:", await role.getAddress());

   // deploy projects after 
   const Projects = await hre.ethers.getContractFactory("ProjectFactory");
   const project = await Projects.deploy(await role.getAddress())
   await project.waitForDeployment();
   console.log("ProjectFactory deployed at:", await project.getAddress());

   await role.registerContractor(sender.address);
   console.log("Registered contractor");

   await role.registerOfficial(sender.address);
   console.log("Registered official");

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });