"use client";

import { useEffect, useState } from "react";
import { fetchUsers } from "./actions";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function UsersPage() {
  const [users, setUsers] = useState<
    { id: string; name: string; email: string; role: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  if (loading) return <p className="text-center">Loading users...</p>;

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3 text-left">Name</th>
            <th className="border p-3 text-left">Email</th>
            <th className="border p-3 text-left">Role</th>
            <th className="border p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3 flex justify-center space-x-2">
                  <button className="text-blue-500 hover:underline">
                    <PencilSquareIcon className="w-5 h-5 inline" /> Edit
                  </button>
                  <button className="text-red-500 hover:underline">
                    <TrashIcon className="w-5 h-5 inline" /> Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
