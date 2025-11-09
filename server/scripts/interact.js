// interact.js

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");
console.log(JSON.stringify(contract.abi));
