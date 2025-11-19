"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { faker } from "@faker-js/faker"
import { Button } from "../ui/button"
import { ArrowUpDown, Info } from "lucide-react"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"

// 🧱 TYPE
export type Expenses = {
  projectID: string
  expenseID: string
  amount: string
  description: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID'
}

// 🧱 FAKE DATA
const createExpenses = (numExp: number) => {
  const expenses: Expenses[] = []
  for (let i = 0; i < numExp; i++) {
    expenses.push({
      expenseID: faker.number.int({min:1, max:200}).toString(),
      amount: faker.finance.amount({ min: 0.1, max: 10, dec: 4 }), // ETH amount
      contractor: faker.finance.ethereumAddress(),
      description: faker.commerce.productDescription(),
      status: faker.helpers.arrayElement(["PENDING", "APPROVED", "PAID"]),
    })
  }
  return expenses
}
export const data: Expenses[] = [...createExpenses(200)]

// 🧱 COLUMNS
export const exp_col: ColumnDef<Expenses>[] = [
  {
    accessorKey: "expenseID",
    header: () => <div className="flex justify-center">Expense ID</div>,
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("expenseID")}</div>,
    meta: { title: "Expense ID" },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    sortingFn: (a, b) => {
      const amountA = parseFloat(a.original.amount);
      const amountB = parseFloat(b.original.amount);
      return amountA - amountB;
    },
    cell: ({ row }) => {
      const ethAmount = parseFloat(row.getValue("amount"));
      const ethToPhp = 18800000000000; // ETH to PHP rate - update as needed
      const phpAmount = ethAmount * ethToPhp;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(phpAmount);
      return (
        <div className="flex flex-col items-center">
          <div className="font-medium">{formatted}</div>
        </div>
      )
    },
    meta: { title: "Amount" },
  },
  {
    accessorKey: "description",
    header: () => <div className="flex justify-center">Description</div>,
    cell: ({ row }) => {
      const desc = row.getValue("description") as string
      const truncated = desc.length > 50 ? desc.substring(0, 50) + "..." : desc

      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-700">
              {truncated}
              {desc.length > 50 && <Info className="w-4 h-4 opacity-60" />}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <p className="text-sm">{desc}</p>
          </HoverCardContent>
        </HoverCard>
      )
    },
    meta: { title: "Description" },
  },
  {
    accessorKey: "status",
    header: () => <div className="flex justify-center">Payment Status</div>,
    cell: ({ row }) => {
      const status = (row.getValue("status") as string).toLowerCase();
      return (
        <span
          className={`flex justify-center items-center px-2 py-1 rounded-full text-xs font-medium ${
            status === "pending"
              ? "bg-yellow-300/80 text-yellow-800"
              : status === "approved"
              ? "bg-blue-200 text-blue-700"
              : status === "rejected"
              ? "bg-red-300/80 text-red-800"
              : status === "paid"
              ? "bg-green-200 text-green-700"
              : "bg-gray-200 text-gray-700" // fallback for any other status
          }`}
        >
          {status}
        </span>
      )
    },
    meta: { title: "Payment Status" },
  },
  
]