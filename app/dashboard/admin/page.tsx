import { fetchAdminStats } from "./actions";
import { ClipboardIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { ElementType } from "react";

export default async function AdminDashboard() {
  const stats = await fetchAdminStats();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Applications"
          value={stats.totalApplications ?? 0}
          icon={ClipboardIcon}
        />
        <StatCard
          title="Approved Applications"
          value={stats.approvedApplications ?? 0}
          icon={ClipboardIcon}
        />
        <StatCard
          title="Rejected Applications"
          value={stats.rejectedApplications ?? 0}
          icon={ClipboardIcon}
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers ?? 0}
          icon={UserGroupIcon}
        />
      </div>
    </div>
  );
}

// Type for the StatCard component
function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: ElementType;
}) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
      <Icon className="w-10 h-10 text-gray-700" />
      <div>
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
