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
  proj_id: number
  ctr_id: number
  proj_name: string
  proj_type: "road" | "infrastructure" | "others"
  proj_desc: string
  proj_status: "pending" | "ongoing" | "completed"
  proj_loc: string
  proj_date: Date
  proj_budget: number
}

// 🧱 FAKE DATA
const createProjects = (numProj: number) => {
  const projs: Project[] = []
  for (let i = 0; i < numProj; i++) {
    projs.push({
      proj_id: faker.number.int(),
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
    accessorKey: "proj_id",
    header: () => <div className="flex justify-center">Project ID</div>,
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("proj_id")}</div>,
    meta: { title: "Project ID" },
  },
  {
    accessorKey: "ctr_id",
    header: () => <div className="flex justify-center">Contractor ID</div>,
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("ctr_id")}</div>,
    meta: { title: "Contractor ID" },
  },
  {
    accessorKey: "proj_name",
    header: () => <div className="flex justify-center">Project Name</div>,
    cell: ({ row }) => {
      const name = row.getValue("proj_name") as string
      const desc = row.original.proj_desc
      const loc = row.original.proj_loc

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
    accessorKey: "proj_type",
    header: () => <div className="flex justify-center">Project Type</div>,
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("proj_type")}</div>,
    meta: { title: "Project Type" },
  },
  {
    accessorKey: "proj_status",
    header: () => <div className="flex justify-center">Project Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("proj_status")
      return (
        <span
          className={`flex justify-center items-center px-2 py-1 rounded-full text-xs font-medium ${
            status === "pending"
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
    accessorKey: "proj_date",
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
      const dateA = new Date(a.original.proj_date).getTime()
      const dateB = new Date(b.original.proj_date).getTime()
      return dateA - dateB
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("proj_date"))
      const formatted = date.toLocaleString("default", { month: "long", year: "numeric" })
      return <div className="flex justify-center">{formatted}</div>
    },
    meta: { title: "Project Date" },
  },
  {
    accessorKey: "proj_budget",
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
    sortingFn: "basic",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("proj_budget"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(amount)
      return <div className="flex justify-center font-medium">{formatted}</div>
    },
    meta: { title: "Project Budget" },
  },
]
