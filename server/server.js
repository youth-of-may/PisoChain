import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import projectRoutes from './api/routes/projects';
import expenseRoutes from './api/routes/expenses';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/projects', projectRoutes)
app.use('/expenses', expenseRoutes)

app.listen(5000, () => console.log(`Server running on port ${PORT}`));
