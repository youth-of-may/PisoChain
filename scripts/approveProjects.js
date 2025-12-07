import hre from 'hardhat';
import "@nomicfoundation/hardhat-ethers";
import 'dotenv/config';
import { projectFactoryABI, projectABI } from '../server/api/utils/contract.js';

async function main() {
    const signers = await hre.ethers.getSigners();
    
    console.log("Total signers available:", signers.length);

    const owner = signers[0];
    const official = signers[1];
    const contractor1 = signers[2];
    const contractor2 = signers[3];
    const contractor3 = signers[4];

    console.log("Owner:", owner.address);
    console.log("Official:", official?.address || "Not available");
    console.log("Contractor 1:", contractor1?.address || "Not available");
    console.log("Contractor 2:", contractor2?.address || "Not available");
    console.log("Contractor 3:", contractor3?.address || "Not available");

    const projectFactory = await hre.ethers.getContractAt(projectFactoryABI, process.env.CONTRACT_ADDRESS);
    const role = await hre.ethers.getContractAt('RoleRegistry', process.env.ROLE_ADDRESS);

    const count = await projectFactory.getProjectCount();
    console.log("\n📊 Total projects created:", count.toString());

    // Get all projects
    const allProjects = await projectFactory.getAllProjects();
    console.log("\n📍 Project addresses:");
    allProjects.forEach((addr, i) => {
        console.log(`  Project ${i + 1}: ${addr}`);
    });
   
    if (official && allProjects[0]) {
        console.log("\n✅ Approving expense for Project 0...");
        const project0 = await hre.ethers.getContractAt(projectABI, allProjects[0]);
        const tx0 = await project0.connect(official).approveExpense(0);
        await tx0.wait(); // Wait for transaction to be mined
        console.log("   Expense approved!");
    }
    
    if (official && allProjects[1]) {
        console.log("\n🚀 Setting Project 1 to ONGOING...");
        const project1 = await hre.ethers.getContractAt(projectABI, allProjects[1]);
        const tx1 = await project1.connect(official).setProjectOngoing();
        await tx1.wait(); // Wait for transaction to be mined
        console.log("   Project set to ONGOING!");
    }


    if (official && allProjects[3]) {
        console.log("\n🚀 Setting Project 3 to ONGOING...");
        const project3 = await hre.ethers.getContractAt(projectABI, allProjects[3]);
        const tx3 = await project3.connect(official).setProjectOngoing();
        await tx3.wait(); // Wait for transaction to be mined
        console.log("   Project set to ONGOING!");
    }

    console.log("\n✨ All transactions completed successfully!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });