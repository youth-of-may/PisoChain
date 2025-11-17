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
export type Project = {
  id: string;
  contractor: string;
  name: string;
  projectType: string;
  description: string;
  status: 'AWAITING' | 'ONGOING' | 'COMPLETED';
  location: string;
  completionDate: string;
  budget: string;
}


// 🧱 FAKE DATA
const createProjects = (numProj: number) => {
  const projs: Project[] = []
  for (let i = 0; i < numProj; i++) {
    projs.push({
      proj_id: faker.number.int({min:1, max:50}),
      ctr_id: faker.number.int(),
      proj_name: faker.company.buzzNoun(),
      proj_type: faker.helpers.arrayElement(["road", "infrastructure", "others"]),
      proj_desc: faker.commerce.productDescription(),
      proj_status: faker.helpers.arrayElement(["pending", "ongoing", "completed"]),
      proj_loc: faker.location.city(),
      proj_date: faker.date.anytime(),
      proj_budget: faker.number.int(),
    })
  }
  return projs
}
export const data: Project[] = [...createProjects(50)]

// 🧱 COLUMNS
export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "id",
    header: () => <div className="flex justify-center">Project ID</div>,
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("id")}</div>,
    meta: { title: "Project ID" },
  },
  {
    accessorKey: "contractor",
    header: () => <div className="flex justify-center">Contractor ID</div>,
    cell: ({ row }) => {
      const address = row.getValue("contractor") as string;
      // Show shortened address (first 6 and last 4 characters)
      const shortened = `${address.slice(0, 6)}...${address.slice(-4)}`;
      return <div className="flex justify-center font-mono text-sm">{shortened}</div>
    },
    meta: { title: "Contractor ID" },
  },
  {
    accessorKey: "name",
    header: () => <div className="flex justify-center">Project Name</div>,
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      const desc = row.original.description
      const loc = row.original.location

      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer text-blue-700 hover:text-blue-800">
              {name}
              <Info className="w-4 h-4 opacity-60" />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 space-y-2">
            <p className="text-sm">
              <span className="font-semibold">Description:</span> {desc}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Location:</span> {loc}
            </p>
          </HoverCardContent>
        </HoverCard>
      )
    },
    meta: { title: "Project Name" },
  },
  {
    accessorKey: "projectType",
    header: () => <div className="flex justify-center">Project Type</div>,
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("projectType")}</div>,
    meta: { title: "Project Type" },
  },
  {
    accessorKey: "status",
    header: () => <div className="flex justify-center">Project Status</div>,
    cell: ({ row }) => {
      const status = (row.getValue("status") as string).toLowerCase();
      return (
        <span
          className={`flex justify-center items-center px-2 py-1 rounded-full text-xs font-medium ${
            status === "awaiting"
              ? "bg-yellow-300/80 text-yellow-800"
              : status === "ongoing"
              ? "bg-blue-200 text-blue-700"
              : "bg-green-200 text-green-700"
          }`}
        >
          {status}
        </span>
      )
    },
    meta: { title: "Project Status" },
  },
  {
    accessorKey: "completionDate",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    sortingFn: (a, b) => {
      const dateA = new Date(a.original.completionDate).getTime()
      const dateB = new Date(b.original.completionDate).getTime()
      return dateA - dateB
    },
    cell: ({ row }) => {
      const dateString = row.getValue("completionDate") as string;
      const date = new Date(dateString);
      const formatted = date.toLocaleString("default", { month: "long", year: "numeric" });
      return <div className="flex justify-center">{formatted}</div>
    },
    meta: { title: "Project Date" },
  },
  {
    accessorKey: "budget",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project Budget
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    sortingFn: (a, b) => {
      const budgetA = parseFloat(a.original.budget);
      const budgetB = parseFloat(b.original.budget);
      return budgetA - budgetB;
    },
    cell: ({ row }) => {
    const ethAmount = parseFloat(row.getValue("budget"));
    const ethToPhp = 18800000000000; // Example rate, update with real rate
    const phpAmount = ethAmount * ethToPhp;
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PHP",
    }).format(phpAmount);
    return <div className="flex justify-center font-medium">{formatted}</div>
  },
    meta: { title: "Project Budget" },
  },
]