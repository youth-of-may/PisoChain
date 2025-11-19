import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';

dotenv.config();

const {
  API_URL,
  PRIVATE_KEY_1,
  PRIVATE_KEY_2,
  PRIVATE_KEY_3,
  PRIVATE_KEY_4,
  PRIVATE_KEY_5
} = process.env;


const accounts = [
  PRIVATE_KEY_1,
  PRIVATE_KEY_2,
  PRIVATE_KEY_3,
  PRIVATE_KEY_4,
  PRIVATE_KEY_5
]
  .filter(key => key) 
  .map(key => `0x${key}`);

const config: HardhatUserConfig = {
  solidity: "0.8.5",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      accounts: {
        count: 20,
        accountsBalance: "10000000000000000000000"
      }
    },
    sepolia: {
      url: API_URL || "",
      accounts: accounts 
    }
  }
};

export default config;