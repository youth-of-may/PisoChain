import hre from 'hardhat';
import "@nomicfoundation/hardhat-ethers";

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

    // Deploy role registry first 
    const RoleRegistry = await hre.ethers.getContractFactory("RoleRegistry");
    const role = await RoleRegistry.deploy();
    await role.waitForDeployment();
    console.log("RoleRegistry deployed at:", await role.getAddress());

    // Deploy projects after 
    const Projects = await hre.ethers.getContractFactory("ProjectFactory");
    const projectFactory = await Projects.deploy(await role.getAddress());
    await projectFactory.waitForDeployment();
    console.log("ProjectFactory deployed at:", await projectFactory.getAddress());

    // Register roles 
    console.log("\nRegistering roles...");
    
    if (owner) {
        await (await role.registerOfficial(owner.address)).wait();
        console.log("✅ Registered owner as official");
        // FIX: Check registration on contract, not signer
        const isOfficial = await role.isGovernmentOfficial(owner.address);
        console.log("Owner is official:", isOfficial);
    }
    
    if (official) {
        await (await role.registerOfficial(official.address)).wait();
        console.log("✅ Registered official");
        const isOfficial = await role.isGovernmentOfficial(official.address);
        console.log("Official registered:", isOfficial);
    }
    
    if (contractor1) {
        await (await role.registerContractor(contractor1.address)).wait();
        console.log("✅ Registered contractor1");
        const isContractor = await role.isContractor(contractor1.address);
        console.log("Contractor1 registered:", isContractor);
    }
    
    if (contractor2) {
        await (await role.registerContractor(contractor2.address)).wait();
        console.log("✅ Registered contractor2");
        const isContractor = await role.isContractor(contractor2.address);
        console.log("Contractor2 registered:", isContractor);
    }
    
    if (contractor3) {
        // FIX: Was registering contractor2 twice!
        await (await role.registerContractor(contractor3.address)).wait();
        console.log("✅ Registered contractor3");
        const isContractor = await role.isContractor(contractor3.address);
        console.log("Contractor3 registered:", isContractor);
    }

    console.log("\nCreating projects...");

    // Create projects
    if (official && contractor1) {
        const tx1 = await projectFactory.connect(official).proposeProject(
            contractor1.address,
            "Project Sierra",
            "Nature",
            "Project kontra Uwan",
            "Quezon City",
            "11-12-2027",
            { value: hre.ethers.parseEther("0.01") }
        );
        await tx1.wait();
        console.log("✅ Project 1 created by official");
    }
    
    if (official && contractor2) {
        const tx2 = await projectFactory.connect(official).proposeProject(
            contractor2.address,
            "DustBia Road",
            "Road & Infrastructure",
            "Dustin my bebeloves",
            "Ateneo",
            "06-12-2028",
            { value: hre.ethers.parseEther("0.01") }
        );
        await tx2.wait();
        console.log("✅ Project 2 created by official");
    }

    const count = await projectFactory.getProjectCount();
    console.log("\nTotal projects:", count.toString());

    // Get all projects
    const allProjects = await projectFactory.getAllProjects();
    console.log("\nProject addresses:");
    allProjects.forEach((addr, i) => {
        console.log(`  Project ${i}: ${addr}`);
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });