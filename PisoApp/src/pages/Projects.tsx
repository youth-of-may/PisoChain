import React, { useState, useEffect } from 'react';
import { DataTable } from '../components/projects/data-table'
import { columns } from '../components/projects/columns'
import type { Project } from '../components/projects/columns'
import { supabase } from "@/lib/supabase.js";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          
          // Map snake_case to camelCase if needed
          const mappedProjects = data.map(project => ({
            id: project.id,
            contractor: project.contractor,
            name: project.name,
            projectType: project.project_type,
            description: project.description,
            status: project.status,
            location: project.location,
            completionDate: project.completion_date,
            budget: project.budget,
            projectAddress: project.project_address
          }));
          
          setProjects(mappedProjects);
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