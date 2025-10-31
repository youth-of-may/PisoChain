import { Button } from "@/components/ui/button"
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
        
        <div className="flex w-full justify-center items-center gap-6 h-48 mb-16">
        <Card className="bg-[#1E4E79] p-9 shadow-sm w-[27%] slate">
            <CardHeader>
            <CardDescription className="text-slate-400 text-lg">Total Allocated Budget</CardDescription>
            <CardTitle className="text-white text-7xl font-bold tabular-nums">
                ₱1.5T
            </CardTitle>
            <CardDescription className="text-slate-400">Visitors for the last 6 months</CardDescription>
            </CardHeader>
        </Card>

        <Card className="bg-card p-4 shadow-sm w-[27%] p-9">
            <CardHeader>
            <CardDescription className="text-lg">Total Projects</CardDescription>
            <CardTitle className="text-7xl font-bold tabular-nums">
                1.5K
            </CardTitle>
            <CardDescription>Visitors for the last 6 months</CardDescription>
            </CardHeader>
        </Card>

        <Card className="bg-card p-4 shadow-sm w-[27%] p-9">
            <CardHeader>
            <CardDescription className="text-lg">Total Approved Expenses</CardDescription>
            <CardTitle className="text-7xl font-bold tabular-nums">
                ₱10.5M
            </CardTitle>
            <CardDescription>Visitors for the last 6 months</CardDescription>
            </CardHeader>
        </Card>
        </div>

        <Button variant="outline" size="lg" 
        className="bg-white border-2 p-6 text-lg border-[#1E4E79] rounded-full" 
        onClick={() => window.open('/projects', '_self')}
        >EXPLORE PROJECTS</Button>
        </>
    )
}