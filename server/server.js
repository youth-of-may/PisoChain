import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import projectRoutes from './api/routes/projects';
import expenseRoutes from './api/routes/expenses';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRoutes)
app.use('/api/expenses', expenseRoutes)

app.listen(5000, () => console.log(`Server running on port ${PORT}`));
