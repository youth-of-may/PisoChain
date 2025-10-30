import { Routes, Route } from "react-router-dom";
import MainLayout from './pages/MainLayout';
import Dashboard from './pages/Dashboard';
import Regions from "./pages/Regions";
import './index.css'
import Projects from './pages/Projects';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout/>}>
      <Route index element={<Dashboard/>}/>
      <Route path="projects" element={<Projects/>}/>
      <Route path="regions" element={<Regions/>}/>
      </Route>
    </Routes>
      
    </>
  )
}

export default App
