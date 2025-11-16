import chai from 'chai';
import hre from 'hardhat';
import "@nomicfoundation/hardhat-ethers";

const { expect } = chai;

describe("ProjectFactory - proposeProject", function () {
  let roleRegistry;
  let projectFactory;
  let owner, contractor, govOfficial;

  beforeEach(async function () {
    // Get signers with error handling
    const signers = await hre.ethers.getSigners();
    
    console.log("Total signers available:", signers.length);
    
    if (signers.length < 3) {
      throw new Error(`Need at least 3 signers, only got ${signers.length}`);
    }

    owner = signers[0];
    contractor = signers[1];
    govOfficial = signers[2];

    // Verify all are defined
    console.log("Owner:", owner?.address || "UNDEFINED");
    console.log("Contractor:", contractor?.address || "UNDEFINED");
    console.log("GovOfficial:", govOfficial?.address || "UNDEFINED");

    // Deploy RoleRegistry
    const RoleRegistry = await hre.ethers.getContractFactory("RoleRegistry");
    roleRegistry = await RoleRegistry.deploy();
    await roleRegistry.waitForDeployment();
    console.log("RoleRegistry deployed at:", await roleRegistry.getAddress());

    // Deploy ProjectFactory
    const ProjectFactory = await hre.ethers.getContractFactory("ProjectFactory");
    projectFactory = await ProjectFactory.deploy(await roleRegistry.getAddress());
    await projectFactory.waitForDeployment();
    console.log("ProjectFactory deployed at:", await projectFactory.getAddress());

    // Register government official
    await roleRegistry.connect(owner).registerOfficial(govOfficial.address);
    console.log("Registered govOfficial");
    
    // Register contractor
    await roleRegistry.connect(owner).registerContractor(contractor.address);
    console.log("Registered contractor");

    // Verify registrations
    const isOfficial = await roleRegistry.isGovernmentOfficial(govOfficial.address);
    const isContr = await roleRegistry.isContractor(contractor.address);
    console.log("Is official registered?", isOfficial);
    console.log("Is contractor registered?", isContr);
  });

  it("should propose a new project", async function () {
    const budget = hre.ethers.parseEther("1");

    const tx = await projectFactory.connect(govOfficial).proposeProject(
      contractor.address,
      "Road Repair",
      "Infrastructure",
      "Fixing potholes",
      "Cebu City",
      "2025-12-25",
      { value: budget }
    );

    await tx.wait();
    console.log("Project created!");

    const allProjects = await projectFactory.getAllProjects();
    console.log("Total projects:", allProjects.length);
    
    expect(allProjects.length).to.equal(1);
    expect(allProjects[0]).to.not.equal(hre.ethers.ZeroAddress);
  });

  it("should create a project that stores correct values", async function () {
    const budget = hre.ethers.parseEther("2");

    await projectFactory.connect(govOfficial).proposeProject(
      contractor.address,
      "Bridge Construction",
      "Infrastructure",
      "New bridge",
      "Manila",
      "2026-05-20",
      { value: budget }
    );

    const allProjects = await projectFactory.getAllProjects();
    const projectAddress = allProjects[0];

    const Project = await hre.ethers.getContractFactory("Project");
    const project = Project.attach(projectAddress);

    const name = await project.name();
    const location = await project.location();
    const projectType = await project.projectType();
    const description = await project.description();
    const budget2 = await project.projectTotalBudget();
    
    expect(name).to.equal("Bridge Construction");
    expect(location).to.equal("Manila");
    expect(projectType).to.equal("Infrastructure");
    expect(description).to.equal("New bridge");
    expect(budget2).to.equal(budget);
  });
});