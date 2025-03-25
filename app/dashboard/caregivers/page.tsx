"use client";

import React, { useEffect, useState, useTransition } from "react";
import { fetchCaregiverDashboardStats } from "./actions";
import {
  FiClipboard,
  FiCheckCircle,
  FiClock,
  FiBookOpen,
} from "react-icons/fi";

// Define TypeScript Interface for Dashboard Stats
interface DashboardStats {
  totalApplications: number;
  approvedApplications: number;
  pendingApplications: number;
  completedCourses: number;
}

// Reusable Dashboard Card Component
function DashboardCard({
  title,
  count,
  icon,
}: {
  title: string;
  count: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white p-4 shadow rounded-lg flex items-center space-x-4">
      <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
      <div>
        <p className="text-lg font-semibold">{count}</p>
        <p className="text-gray-600">{title}</p>
      </div>
    </div>
  );
}

export default function CaregiverDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await fetchCaregiverDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        setError("Unable to load dashboard data. Please try again.");
      }
    });
  }, []);

  if (pending) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Welcome, Caregiver
        </h1>
        {/* Skeleton Loader */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-4 shadow rounded-lg animate-pulse"
            >
              <div className="h-10 w-10 bg-gray-200 rounded-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Welcome, Caregiver
      </h1>

      {/* Dashboard Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Applications"
          count={stats?.totalApplications || 0}
          icon={<FiClipboard className="text-3xl text-blue-500" />}
        />
        <DashboardCard
          title="Approved Applications"
          count={stats?.approvedApplications || 0}
          icon={<FiCheckCircle className="text-3xl text-green-500" />}
        />
        <DashboardCard
          title="Pending Applications"
          count={stats?.pendingApplications || 0}
          icon={<FiClock className="text-3xl text-yellow-500" />}
        />
        <DashboardCard
          title="Completed Courses"
          count={stats?.completedCourses || 0}
          icon={<FiBookOpen className="text-3xl text-purple-500" />}
        />
      </div>
    </div>
  );
}
