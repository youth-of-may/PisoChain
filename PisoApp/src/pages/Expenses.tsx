import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { exp_col } from "@/components/expenses/exp_col"
import type { Expenses } from "@/components/expenses/exp_col"
import { ExpensesDataTable } from "@/components/expenses/exp_data_table"
import { ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabase"

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
        async function fetchExpenses() {
            try {
                const { data, error } = await supabase
                    .from('expenses')
                    .select('*')
                    .eq('project_id', id)
                    .order('expense_id', { ascending: true });

                if (error) {
                    console.error('Supabase error:', error);
                    setError(error.message);
                } else if (data) {
                    console.log('Fetched expenses:', data);
                    
                    // Map snake_case to camelCase to match your Expenses type
                    const mappedExpenses = data.map(expense => ({
                        expenseID: expense.expense_id,
                        projectId: expense.project_id,
                        amount: expense.amount,
                        contractor: expense.contractor,
                        description: expense.description,
                        status: expense.status,
                    }));
                    
                    setExpenses(mappedExpenses);
                    setError(null);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
                setError('Failed to load expenses');
            } finally {
                setLoading(false);
            }
        }
        
        if (id) {
            fetchExpenses();
        } else {
            setLoading(false);
            setError('No project ID provided');
        }
    }, [id]);

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