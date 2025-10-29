import Navlinks from "./Navlinks";

export default function Navbar() {
    return(
        <>
        <div className="mb-24 w-full flex items-center lg:flex-nowrap lg:justify-between flex-wrap justify-between py-4 border-black/10 border-b-1 shadow-[0_0px_4px_rgba(0,0,0,0.02)]">
        <h1>PisoChain</h1>
        <Navlinks/>
        </div>
        </>
    )
}