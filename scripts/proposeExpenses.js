import hre from 'hardhat';
import "@nomicfoundation/hardhat-ethers";
import 'dotenv/config';
import { projectFactoryABI } from '../server/api/utils/contract.js';

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

    // Propose expenses for some projects
    console.log("\n💰 Proposing expenses...");

    const projectABI = [
        "function proposeExpense(uint _amount, string _description)",
        "function contractor() view returns (address)",
        "function name() view returns (string)"
    ];



    if (allProjects[2] && contractor1) {
        const project1 = await hre.ethers.getContractAt(projectABI, allProjects[2]);
        const contractorAddr = await project1.contractor();
        
        if (contractorAddr === contractor1.address) {
            const expense1a = await project1.connect(contractor1).proposeExpense(
                hre.ethers.parseEther("0.002"),
                "Sidewalk construction"
            );
            await expense1a.wait();
            console.log("✅ Expense proposed for Commonwealth Avenue Expansion: 0.002 ETH");
            const expense1b = await project1.connect(contractor1).proposeExpense(
                hre.ethers.parseEther("0.05"),
                "Bike lane markings or pavement"
            );
            await expense1b.wait();
            console.log("✅ Expense proposed for Commonwealth Avenue Expansion: 0.05 ETH");
        }
    }

    // Propose expense for Project 2 (Elementary School)
    if (allProjects[1] && contractor2) {
        const project2 = await hre.ethers.getContractAt(projectABI, allProjects[1]);
        const contractorAddr = await project2.contractor();
        
        if (contractorAddr === contractor2.address) {
            const expense2 = await project2.connect(contractor2).proposeExpense(
                hre.ethers.parseEther("0.005"),
                "Road signs & lane markings"
            );
            await expense2.wait();
            console.log("✅ Expense proposed for Elementary School: 0.006 ETH");
        }
    }


    console.log("\n✨ Setup complete!");
    console.log("\n📝 Summary:");
    console.log(`  - Total Projects: ${count.toString()}`);
    console.log("  - Total Budget Allocated: 0.245 ETH");
    console.log("  - Expenses Proposed: 6 expenses across 5 projects");
    console.log("\n💸 Budget breakdown:");
    console.log("  - Contractor 1 (3 projects): 0.068 ETH");
    console.log("  - Contractor 2 (4 projects): 0.093 ETH");
    console.log("  - Contractor 3 (3 projects): 0.064 ETH");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });