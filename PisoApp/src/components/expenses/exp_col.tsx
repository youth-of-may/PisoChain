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
  proj_id: number
  exp_id: number
  exp_desc: string
  exp_status: "Approved" | "Rejected"
  exp_date: Date
  exp_amt: number
}

// 🧱 FAKE DATA
const createExpenses = (numExp: number) => {
  const expenses: Expenses[] = []
  for (let i = 0; i < numExp; i++) {
    expenses.push({
      proj_id: faker.number.int({min:1, max:50}),
      exp_id: faker.number.int(),
      exp_desc: faker.commerce.productDescription(),
      exp_status: faker.helpers.arrayElement(["Approved", "Rejected"]),
      exp_date: faker.date.anytime(),
      exp_amt: faker.number.int(),
    })
  }
  return expenses
}
export const data: Expenses[] = [...createExpenses(200)]

// 🧱 COLUMNS
export const exp_col: ColumnDef<Expenses>[] = [
  {
    accessorKey: "proj_id",
    header: () => <div className="flex justify-center">Project ID</div>,
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("proj_id")}</div>,
    meta: { title: "Project ID" },
  },
  {
    accessorKey: "exp_id",
    header: () => <div className="flex justify-center">Expenses ID</div>,
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("exp_id")}</div>,
    meta: { title: "Expenses ID" },
  },
  {
    accessorKey: "exp_status",
    header: () => <div className="flex justify-center">Expenses Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("exp_status")
      return (
        <span
          className={`flex justify-center items-center px-2 py-1 rounded-full text-xs font-medium ${
            status === "Rejected"
              ? "bg-red-300/80 text-red-800"
              : "bg-green-200 text-green-700"
          }`}
        >
          {status}
        </span>
      )
    },
    meta: { title: "Expenses Status" },
  },
  {
    accessorKey: "exp_date",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expenses Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    sortingFn: (a, b) => {
      const dateA = new Date(a.original.exp_date).getTime()
      const dateB = new Date(b.original.exp_date).getTime()
      return dateA - dateB
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("exp_date"))
      const formatted = date.toLocaleString("default", { month: "long", year: "numeric" })
      return <div className="flex justify-center">{formatted}</div>
    },
    meta: { title: "Expenses Date" },
  },
  {
    accessorKey: "exp_amt",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expenses Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    sortingFn: "basic",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("exp_amt"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(amount)
      return <div className="flex justify-center font-medium">{formatted}</div>
    },
    meta: { title: "Expenses Amount" },
  },
]
