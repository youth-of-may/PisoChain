import React, { useState, useEffect } from 'react';
import { DataTable } from '../components/projects/data-table'
import { columns } from '../components/projects/columns'
import type { Project } from '../components/projects/columns'
import { supabase } from "@/lib/supabase.js";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 const parseDate = (dateString: string | null | undefined): Date | null => {
  if (!dateString) {
    console.log('No date string provided');
    return null;
  }
  
  try {
    console.log('Parsing date:', dateString); // Debug log
    
    // Try parsing the date directly first
    let date = new Date(dateString);
    
    // If that fails, try extracting just the date part
    if (isNaN(date.getTime())) {
      const dateOnly = dateString.split('T')[0].split(' ')[0];
      date = new Date(dateOnly + 'T00:00:00'); // Add time component for better compatibility
    }
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid date after parsing:', dateString);
      return null;
    }
    
    console.log('Successfully parsed date:', date); // Debug log
    return date;
  } catch (err) {
    console.error('Date parsing error:', err, dateString);
    return null;
  }
};

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.error('Supabase error:', error);
          setError(error.message);
        } else if (data) {
          console.log('Fetched projects:', data);
          
          // Map snake_case to camelCase with safe date parsing
          const mappedProjects = data.map(project => {
            const parsedDate = parseDate(project.completion_date);
            
            return {
              id: project.id,
              contractor: project.contractor,
              name: project.name,
              projectType: project.project_type,
              description: project.description,
              status: project.status,
              location: project.location,
              completionDate: parsedDate, // Will be null if invalid
              budget: project.budget,
              projectAddress: project.project_address
            };
          });
          
          setProjects(mappedProjects);
          setError(null);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-source text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E4E79] mb-4 text-center">
        Project Listings
      </h1>
      <p className="max-w-2xl mx-auto text-center mb-6 sm:mb-8 lg:mb-10 font-inter text-sm sm:text-base px-4">
        Driving National Growth Through Accountable Investment. This initiative oversees critical public works and technology deployment. Using PisoChain, we ensure every phase, from procurement to execution, is fully auditable, transparent, and compliant.
      </p>
      
      <div className="w-full lg:w-[75%] mx-auto flex justify-center items-center">
        <DataTable columns={columns} data={projects} />
      </div>
    </div>
  );
}