import express from 'express';
import projectsRouter from './api/routes/projects.js'
import expensesRouter from './api/routes/expenses.js'
import homeRouter from './api/routes/home.js'
import cors from 'cors';

const app = express();

// Mount the routers with base paths
app.use('/api/projects', projectsRouter);
app.use('/api/expenses', expensesRouter);
app.use('/api/dashboard', homeRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});