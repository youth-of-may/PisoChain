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

   
    console.log("\nCreating projects...");


    // Project 3 - Healthcare (Contractor 3)
    if (official && owner) {
        const tx3 = await projectFactory.connect(official).proposeProject(
            contractor3.address,
            "Valenzuela City Health Center",
            "Healthcare",
            "Establishment of modern health center with diagnostic facilities",
            "Valenzuela City",
            "05-20-2028",
            { value: hre.ethers.parseEther("0.01") }
        );
        await tx3.wait();
        console.log("✅ Project 3: Valenzuela City Health Center (0.03 ETH)");
    }

    // Project 4 - Flood Control (Contractor 1)
    if (official && contractor1) {
        const tx4 = await projectFactory.connect(official).proposeProject(
            contractor1.address,
            "Marikina River Dredging",
            "Flood Control",
            "Dredging and deepening of Marikina River to prevent flooding",
            "Marikina City",
            "11-10-2026",
            { value: hre.ethers.parseEther("0.015") }
        );
        await tx4.wait();
        console.log("✅ Project 4: Marikina River Dredging (0.015 ETH)");
    }

    // Project 5 - Bridge Construction (Contractor 2)
    if (official && contractor2) {
        const tx5 = await projectFactory.connect(official).proposeProject(
            contractor2.address,
            "Pasig-Taguig Bridge Project",
            "Road & Infrastructure",
            "Construction of new bridge connecting Pasig and Taguig",
            "Metro Manila",
            "03-15-2029",
            { value: hre.ethers.parseEther("0.02") }
        );
        await tx5.wait();
        console.log("✅ Project 5: Pasig-Taguig Bridge (0.02 ETH)");
    }

    // Project 6 - Water System (Contractor 3)
    if (official && contractor3) {
        const tx6 = await projectFactory.connect(official).proposeProject(
            contractor3.address,
            "Antipolo Water Distribution",
            "Water & Sanitation",
            "Installation of water pipes and distribution system",
            "Antipolo City",
            "07-22-2027",
            { value: hre.ethers.parseEther("0.012") }
        );
        await tx6.wait();
        console.log("✅ Project 6: Antipolo Water Distribution (0.012 ETH)");
    }

    // Project 7 - Public Market (Contractor 1)
    if (official && contractor1) {
        const tx7 = await projectFactory.connect(official).proposeProject(
            contractor1.address,
            "Mandaluyong Public Market",
            "Commercial",
            "Renovation and modernization of public market facility",
            "Mandaluyong City",
            "09-18-2026",
            { value: hre.ethers.parseEther("0.008") }
        );
        await tx7.wait();
        console.log("✅ Project 7: Mandaluyong Public Market (0.008 ETH)");
    }

    // Project 8 - Sports Complex (Contractor 2)
    if (official && contractor2) {
        const tx8 = await projectFactory.connect(official).proposeProject(
            contractor2.address,
            "Makati Sports Complex",
            "Recreation",
            "Construction of multi-purpose sports facility with basketball and volleyball courts",
            "Makati City",
            "06-30-2027",
            { value: hre.ethers.parseEther("0.018") }
        );
        await tx8.wait();
        console.log("✅ Project 8: Makati Sports Complex (0.018 ETH)");
    }

    // Project 9 - Street Lighting (Contractor 3)
    if (official && contractor3) {
        const tx9 = await projectFactory.connect(official).proposeProject(
            contractor3.address,
            "Pasay LED Street Lighting",
            "Utilities",
            "Installation of energy-efficient LED street lights",
            "Pasay City",
            "04-12-2026",
            { value: hre.ethers.parseEther("0.012") }
        );
        await tx9.wait();
        console.log("✅ Project 9: Pasay LED Street Lighting (0.012 ETH)");
    }

    // Project 10 - Waste Management (Contractor 1)
    if (official && contractor1) {
        const tx10 = await projectFactory.connect(official).proposeProject(
            contractor1.address,
            "Taguig Waste Segregation Facility",
            "Environmental",
            "Construction of modern waste segregation and recycling center",
            "Taguig City",
            "10-05-2027",
            { value: hre.ethers.parseEther("0.02") }
        );
        await tx10.wait();
        console.log("✅ Project 10: Taguig Waste Segregation Facility (0.02 ETH)");
    }

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


    if (allProjects[0] && contractor1) {
        const project1 = await hre.ethers.getContractAt(projectABI, allProjects[0]);
        const contractorAddr = await project1.contractor();
        
        if (contractorAddr === contractor1.address) {
            const expense1 = await project1.connect(contractor1).proposeExpense(
                hre.ethers.parseEther("0.008"),
                "Water for AI"
            );
            await expense1.wait();
            console.log("Expense proposed for Sierra Madre Baddie Pics: 0.008 ETH");
        }
    }


    if (allProjects[1] && contractor2) {
        const project2 = await hre.ethers.getContractAt(projectABI, allProjects[1]);
        const contractorAddr = await project2.contractor();
        
        if (contractorAddr === contractor2.address) {
            const expense2 = await project2.connect(contractor2).proposeExpense(
                hre.ethers.parseEther("0.006"),
                "Will Ashley tarpaulin"
            );
            await expense2.wait();
            console.log("✅ Expense proposed for DusBia road: 0.006 ETH");
        }
    }

    if (allProjects[2] && contractor1) {
        const project1 = await hre.ethers.getContractAt(projectABI, allProjects[0]);
        const contractorAddr = await project1.contractor();
        
        if (contractorAddr === contractor1.address) {
            const expense1 = await project1.connect(contractor1).proposeExpense(
                hre.ethers.parseEther("0.008"),
                "Heavy equipment rental and fuel for initial site clearing"
            );
            await expense1.wait();
            console.log("✅ Expense proposed for Commonwealth Avenue Expansion: 0.008 ETH");
        }
    }

    // Propose expense for Project 2 (Elementary School)
    if (allProjects[3] && contractor2) {
        const project2 = await hre.ethers.getContractAt(projectABI, allProjects[1]);
        const contractorAddr = await project2.contractor();
        
        if (contractorAddr === contractor2.address) {
            const expense2 = await project2.connect(contractor2).proposeExpense(
                hre.ethers.parseEther("0.006"),
                "Purchase of construction materials: cement, steel bars, and lumber"
            );
            await expense2.wait();
            console.log("✅ Expense proposed for Elementary School: 0.006 ETH");
        }
    }

    // Propose multiple expenses for Project 3 (Health Center)
    if (allProjects[4] && contractor3) {
        const project3 = await hre.ethers.getContractAt(projectABI, allProjects[2]);
        const contractorAddr = await project3.contractor();
        
        if (contractorAddr === contractor3.address) {
            const expense3a = await project3.connect(contractor3).proposeExpense(
                hre.ethers.parseEther("0.007"),
                "Foundation work and excavation services"
            );
            await expense3a.wait();
            console.log("✅ Expense 1 proposed for Health Center: 0.007 ETH");

            const expense3b = await project3.connect(contractor3).proposeExpense(
                hre.ethers.parseEther("0.005"),
                "Electrical wiring and plumbing materials"
            );
            await expense3b.wait();
            console.log("✅ Expense 2 proposed for Health Center: 0.005 ETH");
        }
    }

    // Propose expense for Project 5 (Bridge)
    if (allProjects[6] && contractor2) {
        const project5 = await hre.ethers.getContractAt(projectABI, allProjects[4]);
        const contractorAddr = await project5.contractor();
        
        if (contractorAddr === contractor2.address) {
            const expense5 = await project5.connect(contractor2).proposeExpense(
                hre.ethers.parseEther("0.01"),
                "Steel beams and reinforcement materials for bridge structure"
            );
            await expense5.wait();
            console.log("✅ Expense proposed for Pasig-Taguig Bridge: 0.01 ETH");
        }
    }

    // Propose expense for Project 8 (Sports Complex)
    if (allProjects[9] && contractor2) {
        const project8 = await hre.ethers.getContractAt(projectABI, allProjects[7]);
        const contractorAddr = await project8.contractor();
        
        if (contractorAddr === contractor2.address) {
            const expense8 = await project8.connect(contractor2).proposeExpense(
                hre.ethers.parseEther("0.009"),
                "Sports equipment and flooring materials"
            );
            await expense8.wait();
            console.log("✅ Expense proposed for Sports Complex: 0.009 ETH");
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