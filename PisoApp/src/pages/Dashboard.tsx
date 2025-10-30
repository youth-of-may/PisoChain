import Button from "../components/Button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export default function Dashboard() {
    return(
        <>
        
        <h1 className="font-source text-6xl font-bold text-[#1E4E79] mb-4">Every Peso, Every Purpose</h1>
        <p className="w-xl text-center mb-10 font-inter">Lorem ipsum dolor sit amet. Est placeat tenetur ex Quis omnis a tenetur omnis 33 sapiente veritatis est provident galisum ex error odio. </p>
        <div className="flex justify-around w-[95%] font-inter mb-16 gap-x-5">
            <div className="flex flex-col w-[33%] h-48 bg-[#1f4e7a] text-[#D9D9D9] border-2 rounded-xl justify-center items-start">
                <h3 className="text-xl ml-4">Total Allocated Budget</h3>
                <h1 className="text-7xl font-bold font-source text-white ml-4">₱2.45T</h1>
                <p className="ml-4">Fiscal Year 2025</p>
            </div>
            <div className="flex flex-col w-[30%] border-2 rounded-xl justify-center items-start">
                <h3 className="text-[#4D4D4D] text-xl ml-4">Total Projects</h3>
                <h1 className="text-[#2C2C2C] text-7xl font-bold font-source ml-4">191,418</h1>
                <p className="text-[#4D4D4D] ml-4">Fiscal Year 2025</p>
            </div>
            <div className="flex flex-col w-[30%] border-2 rounded-xl justify-center items-start">
                <h3 className="text-[#4D4D4D] text-xl ml-4">Total Approved Expenses</h3>
                <h1 className="text-[#2C2C2C] text-7xl font-bold font-source ml-4">₱19.5M</h1>
                <p className="text-[#4D4D4D] ml-4">Fiscal Year 2025</p>
            </div>
        </div>
        <Button url="/projects" target="_self">EXPLORE PROJECTS</Button>
        <div className="flex w-full justify-center items-center gap-6 h-48">
        <Card className="bg-[#1E4E79] p-9 shadow-sm w-[25%] slate">
            <CardHeader>
            <CardDescription className="text-slate-400">Total Allocated Budget</CardDescription>
            <CardTitle className="text-white text-6xl font-semibold tabular-nums">
                $1,250.00
            </CardTitle>
            <CardDescription className="text-slate-400">Visitors for the last 6 months</CardDescription>
            </CardHeader>
        </Card>

        <Card className="bg-card p-4 shadow-sm w-[25%] p-9">
            <CardHeader>
            <CardDescription>Total Projects</CardDescription>
            <CardTitle className="text-6xl font-semibold tabular-nums">
                $1,250.00
            </CardTitle>
            <CardDescription>Visitors for the last 6 months</CardDescription>
            </CardHeader>
        </Card>

        <Card className="bg-card p-4 shadow-sm w-[25%] p-9">
            <CardHeader>
            <CardDescription>Total Approved Expenses</CardDescription>
            <CardTitle className="text-6xl font-semibold tabular-nums">
                $1,250.00
            </CardTitle>
            <CardDescription>Visitors for the last 6 months</CardDescription>
            </CardHeader>
        </Card>
        </div>

        <Button variant="outline" size="lg" className="bg-white border-2 border-[#1E4E79] rounded-full">EXPLORE PROJECTS</Button>
        </>
    )
}