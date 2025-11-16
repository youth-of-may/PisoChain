'use client';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { DataTable } from '../components/projects/data-table'
import { columns, data } from '../components/projects/columns'
import type { Project } from '../components/projects/columns'



export default function Projects() {
  const [values, setValues] = useState([0, 100000]);
  useEffect(() => {
          async function getData(): Promise<Project[]> {
            // Fetch data from your API here.
            try {
              const response = await axios.get('/projects');
              console.log(response)
              
            }
            catch(err) {
              console.error(err)
            }
          }
          getData() 
      }, [])
  
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-source text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E4E79] mb-4 text-center">
        Project Listings
      </h1>
      <p className="max-w-2xl mx-auto text-center mb-6 sm:mb-8 lg:mb-10 font-inter text-sm sm:text-base px-4">
        Lorem ipsum dolor sit amet. Est placeat tenetur ex Quis omnis a tenetur omnis 33 sapiente veritatis est provident galisum ex error odio.
      </p>
      
      <div className="w-full lg:w-[75%] mx-auto flex justify-center items-center">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}