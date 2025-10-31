'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { DualRangeSlider } from '@/components/ui/range';
import React, { useState } from 'react';
import { DataTable } from '../components/projects/data-table'
import { columns, data } from '../components/projects/columns'
import type { Project } from './components/projects/columns'

async function getData(): Promise<Project[]> {
  // Fetch data from your API here.
  return [
    //sample data
    {
      proj_id: 101010,
      ctr_id: 10000,
      proj_name: "XOOX",
      proj_type: "road",
      proj_desc: "blaaldkalla",
      proj_status: "pending",
      proj_loc: "Manila",
      proj_date: new Date("2025-10-01"),
      proj_budget: 100000000,
    },
    // ...
  ]
}

export default function Projects() {
  //use the code below to access data from blockchain
  //const data = await getData()
  const [values, setValues] = useState([0, 100000]);
    return(
        <>
        <h1 className="font-source text-6xl font-bold text-[#1E4E79] mb-4">Project Listings</h1>
        <p className="w-xl text-center mb-10 font-inter">Lorem ipsum dolor sit amet. Est placeat tenetur ex Quis omnis a tenetur omnis 33 sapiente veritatis est provident galisum ex error odio. </p>
        <div className="w-[75%] flex gap-x-10 justify-center items-center">
            
          <div className="container mx-auto flex justify-center">
        <DataTable columns={columns} data={data} />
        </div>
          
        </div>
    
        </>
    )
}