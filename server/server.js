import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import projectRoutes from './api/routes/projects.js';
import expenseRoutes from './api/routes/expenses.js';
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://piso-chain.vercel.app/', 
  ],
  credentials: true
}));
app.use(express.json());

app.use('/projects', projectRoutes)
app.use('/projects', expenseRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
