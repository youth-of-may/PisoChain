import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

interface DashboardStats {
  totalBudget: number;
  numProjects: number;
  approvedExpenses: number;
  remainingBudget: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalBudget: 0,
    numProjects: 0,
    approvedExpenses: 0,
    remainingBudget: 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('https://pisochain.onrender.com/api/dashboard'); 
      if (!response.ok) throw new Error('Failed to fetch dashboard data');
      const data = await response.json();
      setStats(data);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number): string => {
  // Handle null/undefined/NaN - CHECK THIS FIRST
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '₱0';
  }
  
  if (amount >= 1_000_000_000_000) {
    return `₱${(amount / 1_000_000_000_000).toFixed(1)}T`;
  } else if (amount >= 1_000_000_000) {
    return `₱${(amount / 1_000_000_000).toFixed(1)}B`;
  } else if (amount >= 1_000_000) {
    return `₱${(amount / 1_000_000).toFixed(1)}M`;
  } else if (amount >= 1_000) {
    return `₱${(amount / 1_000).toFixed(1)}K`;
  }
  return `₱${Number(amount).toLocaleString()}`;
};

const formatNumber = (num: number): string => {
  if (num === null || num === undefined || isNaN(num)) {
    return '0';
  }
  
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return String(num);
  };

  if (loading) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-source text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E4E79] mb-4 text-center">
        Every Peso, Every Purpose
      </h1>
      <p className="max-w-2xl mx-auto text-center mb-10 font-inter text-sm sm:text-base px-4">
        Lorem ipsum dolor sit amet. Est placeat tenetur ex Quis omnis a tenetur omnis 33 sapiente veritatis est provident galisum ex error odio. 
      </p>
      
      <div className="flex flex-col sm:flex-col lg:flex-row w-full justify-center items-center gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">
        <Card className="bg-[#1E4E79] p-6 sm:p-8 lg:p-9 shadow-sm w-full sm:w-full lg:w-[27%]">
          <CardHeader className="p-0">
            <CardDescription className="text-slate-400 text-base sm:text-lg">
              Total Allocated Budget
            </CardDescription>
            <CardTitle className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold tabular-nums">
              {formatCurrency(stats.totalBudget)}
            </CardTitle>
            <CardDescription className="text-slate-400 text-sm sm:text-base">
              Across all projects
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-card p-6 sm:p-8 lg:p-9 shadow-sm w-full sm:w-full lg:w-[27%]">
          <CardHeader className="p-0">
            <CardDescription className="text-base sm:text-lg">
              Total Projects
            </CardDescription>
            <CardTitle className="text-5xl sm:text-6xl lg:text-7xl font-bold tabular-nums">
              {formatNumber(stats.numProjects)}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Active and completed projects
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-card p-6 sm:p-8 lg:p-9 shadow-sm w-full sm:w-full lg:w-[27%]">
          <CardHeader className="p-0">
            <CardDescription className="text-base sm:text-lg">
              Total Approved Expenses
            </CardDescription>
            <CardTitle className="text-5xl sm:text-6xl lg:text-7xl font-bold tabular-nums">
              {formatCurrency(stats.approvedExpenses)}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {formatCurrency(stats.remainingBudget)} remaining
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button 
          variant="outline" 
          size="lg" 
          className="bg-white border-2 p-4 sm:p-6 text-base sm:text-lg border-[#1E4E79] rounded-full w-full sm:w-auto" 
          onClick={() => navigate('/projects')}
        >
          EXPLORE PROJECTS
        </Button>
      </div>
    </div>
  );
}