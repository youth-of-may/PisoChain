import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Dashboard() {
    return(
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        
        <h1 className="font-source text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E4E79] mb-4 text-center">
          Every Peso, Every Purpose
        </h1>
        <p className="max-w-2xl mx-auto text-center mb-10 font-inter text-sm sm:text-base px-4">
          Lorem ipsum dolor sit amet. Est placeat tenetur ex Quis omnis a tenetur omnis 33 sapiente veritatis est provident galisum ex error odio. 
        </p>
        
        <div className="flex flex-col sm:flex-col lg:flex-row w-full justify-center items-center gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">
          <Card className="bg-[#1E4E79] p-6 sm:p-8 lg:p-9 shadow-sm w-full sm:w-full lg:w-[27%]">
            <CardHeader className="p-0">
              <CardDescription className="text-slate-400 text-base sm:text-lg">
                Total Allocated Budget
              </CardDescription>
              <CardTitle className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold tabular-nums">
                ₱1.5T
              </CardTitle>
              <CardDescription className="text-slate-400 text-sm sm:text-base">
                Visitors for the last 6 months
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card p-6 sm:p-8 lg:p-9 shadow-sm w-full sm:w-full lg:w-[27%]">
            <CardHeader className="p-0">
              <CardDescription className="text-base sm:text-lg">
                Total Projects
              </CardDescription>
              <CardTitle className="text-5xl sm:text-6xl lg:text-7xl font-bold tabular-nums">
                1.5K
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Visitors for the last 6 months
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card p-6 sm:p-8 lg:p-9 shadow-sm w-full sm:w-full lg:w-[27%]">
            <CardHeader className="p-0">
              <CardDescription className="text-base sm:text-lg">
                Total Approved Expenses
              </CardDescription>
              <CardTitle className="text-5xl sm:text-6xl lg:text-7xl font-bold tabular-nums">
                ₱10.5M
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Visitors for the last 6 months
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white border-2 p-4 sm:p-6 text-base sm:text-lg border-[#1E4E79] rounded-full w-full sm:w-auto" 
            onClick={() => window.location.href = `/projects`}
          >
            EXPLORE PROJECTS
          </Button>
        </div>
        </div>
    )
}