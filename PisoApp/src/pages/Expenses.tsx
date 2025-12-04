import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useState, useEffect } from "react"
import { exp_col } from "@/components/expenses/exp_col"
import type { Expenses } from "@/components/expenses/exp_col"
import { ExpensesDataTable } from "@/components/expenses/exp_data_table"
import { ArrowLeft } from "lucide-react"

export default function Expenses() {
    const { id } = useParams()
    const [expenses, setExpenses] = useState<Expenses[]>([]) 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate(-1) // Go back to previous page
    }
    
    useEffect(() => {
    async function fetchData() {
        try {
            const response = await axios.get(`http://localhost:5000/projects/${id}/expenses`)
            setExpenses(response.data)
            setError(null);
        }
        catch(error) {
            console.error('Error fetching expenses:', error)
            setError('Failed to load expenses');
        }
        finally {
            setLoading(false);
        }
    }
    
    if (id) {  // Add this check to only fetch when id exists
        fetchData() 
    }
}, [id])
     if (loading) return <div className="text-center py-8">Loading...</div>;
     if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <button 
                type="button"
                className="mb-6 text-[#1E4E79] border-2 border-[#1E4E79] hover:bg-[#1E4E79] hover:text-white transition-all duration-300 font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow-md flex items-center gap-2 bg-white" 
                onClick={handleBack}
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
            </button>
            <h1 className="font-source text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E4E79] mb-4 text-center">
                Project Expenses
            </h1>
            <p className="max-w-2xl mx-auto text-center mb-10 font-inter text-sm sm:text-base px-4">
                Public funds require public oversight. This ledger provides a real-time, transparent record of all expenditures related to this project. All transactions are verifiable on the PisoChain network, documenting how funds are being allocated, their purpose, and their current payment status.
            </p>
            <div className="w-full lg:w-[75%] mx-auto flex justify-center items-center">
                <ExpensesDataTable columns={exp_col} data={expenses} />
            </div>
        </div>
    )
}
