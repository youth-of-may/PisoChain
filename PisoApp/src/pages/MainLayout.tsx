import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="">
      <main className="min-h-screen w-full bg-[#f0f7ff] flex flex-col items-center">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}
