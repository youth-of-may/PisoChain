import { Routes, Route } from "react-router-dom";
import MainLayout from './pages/MainLayout';
import Dashboard from './pages/Dashboard';
import Regions from "./pages/Expenses";
import './index.css'
import Projects from './pages/Projects';
import Expenses from "./pages/Expenses";
import About from "./pages/About";

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout/>}>
      <Route index element={<Dashboard/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="projects" element={<Projects/>}/>
      <Route path="regions" element={<Regions/>}/>
      <Route path="projects/:id/expenses" element={<Expenses/>}/>
      </Route>
    </Routes>
      
    </>
  )
}

export default App
