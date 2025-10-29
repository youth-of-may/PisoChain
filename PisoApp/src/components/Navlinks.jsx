import { Link } from "react-router-dom"
export default function Navlinks() {
    return(
        <>
        <nav className="flex gap-x-5 mr-6">
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
        </nav>
        </>
    )
}