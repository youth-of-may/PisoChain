import express from 'express';
import projectsRouter from './api/routes/projects.js'
import expensesRouter from './api/routes/expenses.js'
const app = express();

// Mount the routers with base paths
app.use('/api/projects', projectsRouter);
app.use('/api/expenses', expensesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});