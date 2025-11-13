import express from 'express';
import cors from 'cors';
import { ethers } from 'ethers';
import 'dotenv/config';
import contractABI from './contracts/PisoChain.json' assert {type: 'json'};

const app = express(cors())
app.use(express.json)

const url = process.env.API_URL
const provider = new ethers.JsonRpcProvider(url)
const address = process.env.CONTRACT_ADDRESS
const contract = new ethers.Contract(address, contractABI, provider)

app.get('/api/projects', (req, res) => {
    
})