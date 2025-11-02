import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { exp_col, data } from "@/components/expenses/exp_col"
import type { Expenses } from "@/components/expenses/exp_col"
import { ExpensesDataTable } from "@/components/expenses/exp_data_table"

export default function Expenses() {
    const { id } = useParams()
    const [expenses, setExpenses] = useState<Expenses[]>([]) 
    
    useEffect(() => {
        async function fetchData() {
            try {
                //replace with api fetch
                const filtered = data.filter(expense => expense.proj_id === Number(id))
                setExpenses(filtered)
            }
            catch(error) {
                console.error('Error fetching expenses:', error)
            }
        }
        
        fetchData() 
    }, [id])
    
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="font-source text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E4E79] mb-4 text-center">
                Project Expenses
            </h1>
            <p className="max-w-2xl mx-auto text-center mb-10 font-inter text-sm sm:text-base px-4">
                Lorem ipsum dolor sit amet. Est placeat tenetur ex Quis omnis a tenetur omnis 33 sapiente veritatis est provident galisum ex error odio. 
            </p>
            <div className="w-full lg:w-[75%] mx-auto flex justify-center items-center">
                <ExpensesDataTable columns={exp_col} data={expenses} />
            </div>
        </div>
    )
}