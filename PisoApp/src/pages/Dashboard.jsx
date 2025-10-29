import Button from "../components/Button"
export default function Dashboard() {
    return(
        <>
        
        <h1 className="font-source text-6xl font-bold text-[#1E4E79] mb-4">Every Peso, Every Purpose</h1>
        <p className="w-xl text-center mb-10 font-inter">Lorem ipsum dolor sit amet. Est placeat tenetur ex Quis omnis a tenetur omnis 33 sapiente veritatis est provident galisum ex error odio. </p>
        <div className="flex justify-around w-full font-inter ">
            <div className="flex flex-col w-[33%] h-48 bg-[#1f4e7a] text-[#D9D9D9] rounded-xl">
                <h3>Total Allocated Budget</h3>
                <h1>₱2.45T</h1>
                <p>Fiscal Year 2025</p>
            </div>
            <div className="flex flex-col w-[33%] border-2 rounded-xl">
                <h3 className="text-[#4D4D4D]">Total Allocated Budget</h3>
                <h1 className="text-[#2C2C2C]">₱2.45T</h1>
                <p className="text-[#4D4D4D]">Fiscal Year 2025</p>
            </div>
            <div className="flex flex-col w-[33%] border-2 rounded-xl">
                <h3 className="text-[#4D4D4D]">Total Allocated Budget</h3>
                <h1 className="text-[#2C2C2C]">₱2.45T</h1>
                <p className="text-[#4D4D4D]">Fiscal Year 2025</p>
            </div>
        </div>
        <Button>Explore Projects</Button>
        </>
    )
}