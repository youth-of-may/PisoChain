"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { faker } from '@faker-js/faker';
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

export type Project = {
    proj_id: number,
    ctr_id: number,
    proj_name: string,
    proj_type: "road" | "infrastructure" | "others",
    proj_desc: string,
    proj_status: "pending" | "ongoing" | "completed" , 
    proj_loc: string,
    proj_date: Date,
    proj_budget: number,
}
const createProjects = (numProj: number) => {
    const projs: Project[] = [];
    for (let i =0; i< numProj; i++) {
        projs.push({
            proj_id: faker.number.int(),
            ctr_id: faker.number.int(),
            proj_name: faker.company.buzzNoun(),
            proj_type: faker.helpers.arrayElement(['road', 'infrastructure', 'others']),
            proj_desc: faker.commerce.productDescription(),
            proj_status: faker.helpers.arrayElement(['pending', 'ongoing', 'completed']),
            proj_loc: faker.location.city(),
            proj_date: faker.date.anytime(),
            proj_budget: faker.number.int(),
        })
    }
    return projs
}
export const data: Project[] = [
    ...createProjects(50),
]

export const columns: ColumnDef<Project>[] = [
{
  accessorKey: "proj_id",
  header: ({column}) => {
    return (
        <div className="flex justify-center">Project ID</div>
    )
  },
  cell: ({ row }) => (
    <div className="flex justify-center">{row.getValue("proj_id")}</div>
  ),
  meta: { title: "Project ID" },
},
  {
    accessorKey: "ctr_id",
    header: ({column}) => {
    return (
        <div className="flex justify-center">Contractor ID</div>
    )
  },
  cell: ({ row }) => (
    <div className="flex justify-center">{row.getValue("ctr_id")}</div>
  ),
  meta: { title: "Contractor ID" },
  },
  {
    accessorKey: "proj_name",
    header: ({column}) => {
    return (
        <div className="flex justify-center">Project Name</div>
    )
  },
  cell: ({ row }) => (
    <div className="flex justify-start">{row.getValue("proj_name")}</div>
  ),
  meta: { title: "Project Name" },
  },
  {
    accessorKey: "proj_type",
    header: ({column}) => {
    return (
        <div className="flex justify-center">Project Type</div>
    )
  },
  cell: ({ row }) => (
    <div className="flex justify-start">{row.getValue("proj_type")}</div>
  ),
  meta: { title: "Project Type" },
  },
  {
    accessorKey: "proj_desc",
    header: ({column}) => {
    return (
        <div className="flex justify-center">Project Description</div>
    )
  },
  cell: ({ row }) => (
    <div className="flex justify-start">{row.getValue("proj_desc")}</div>
  ),
  meta: { title: "Project Description" },
  },
{
    accessorKey: "proj_status",
    header: ({column}) => {
    return (
        <div className="flex justify-center">Project Status</div>
    )
  },
  cell: ({ row }) => {
    const status = row.getValue("proj_status")
    return (
      <>
      <span
        className={`flex justify-center px-1 py-2 rounded-full text-xs font-medium ${
          status === "pending"
            ? "bg-yellow-400/80 text-yellow-700"
            : status === "ongoing"
            ? "bg-blue-200 text-blue-700"
            : "bg-green-200 text-green-700"
        }`}
      >
        {status}
      </span>
      </>
    )
  },
  meta: { title: "Project Status" },
  },
  {
    accessorKey: "proj_loc",
    header: ({column}) => {
    return (
        <div className="flex justify-center">Project Location</div>
    )
  },
  cell: ({ row }) => (
    <div className="flex justify-center">{row.getValue("proj_loc")}</div>
  ),
  meta: { title: "Project Location" },
  },


{
  accessorKey: "proj_date",
  header: ({ column }) => {
    return (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    )
  },
  sortingFn: (a, b) => {
    const dateA = new Date(a.original.proj_date).getTime()
    const dateB = new Date(b.original.proj_date).getTime()
    return dateA - dateB
  },
  cell: ({ row }) => {
    const date = new Date(row.getValue("proj_date"))
    const formatted = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    })
    return <div className="flex justify-center">{formatted}</div>
  },
  meta: { title: "Project Date" },
},

  {
    accessorKey: "proj_budget",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project Budget
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        </div>
      )
    },
    sortingFn: "basic",

    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("proj_budget"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(amount)
 
      return <div className="text-right font-medium flex justify-center">{formatted}</div>
    },
    meta: { title: "Project Budget" },
  },
]

