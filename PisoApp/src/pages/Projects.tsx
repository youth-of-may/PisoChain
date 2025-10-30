'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DualRangeSlider } from '@/components/ui/range';
import React, { useState } from 'react';
export default function Projects() {
  const [values, setValues] = useState([0, 100000]);
    return(
        <>
        <h1 className="font-source text-6xl font-bold text-[#1E4E79] mb-4">Project Listings</h1>
        <p className="w-xl text-center mb-10 font-inter">Lorem ipsum dolor sit amet. Est placeat tenetur ex Quis omnis a tenetur omnis 33 sapiente veritatis est provident galisum ex error odio. </p>
        <div className="w-[75%] flex gap-x-10 justify-center items-center">
            
          <Input placeholder="Search..."/>
          <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Progress" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      <div className="w-[25%] px-10 space-y-2 px-10 flex gap-x-2">
        Budget
      <DualRangeSlider
        label={(value) => value}
        value={values}
        onValueChange={setValues}
        min={0}
        max={100000000}
        step={1000}
      />
    </div>
          
        </div>
    
        </>
    )
}